import * as DocumentPicker from 'expo-document-picker';
import { v4 as uuidv4 } from 'uuid';

import { bookExists, insertBook, UploadedBook } from '../../../store';
import { getPrivateDirectory, logger } from '../../../utils';

import { cleanBookName, moveFile, prepareBackendBook, processBookMetadata } from './utils';

let isPickingDocument = false;

type BookUploadParams = {
  onExistingBookFound: (book: UploadedBook) => void;
  onUploadSuccess: (book: FormData) => void;
  onUnsupportedFormat: () => void;
  closeModalForEpub: () => void;
};

export const bookUploader = async ({
  onExistingBookFound,
  onUploadSuccess,
  onUnsupportedFormat,
  closeModalForEpub
  // eslint-disable-next-line sonarjs/cognitive-complexity
}: BookUploadParams) => {
  const ALLOWED_MIME_TYPES = new Set(['application/epub+zip']);

  if (isPickingDocument) {
    logger.warn('Document picker already in progress');
    return;
  }

  isPickingDocument = true;

  const result = await DocumentPicker.getDocumentAsync({});

  if (!result.assets || result.canceled) {
    isPickingDocument = false;
    logger.info('Upload Cancelled. Resetting Document Picking');
    return;
  }

  if (result.assets) {
    try {
      const { uri: oldUri, name, size, mimeType } = result.assets[0];
      const fileExtension = name.split('.').pop();

      if (mimeType && !ALLOWED_MIME_TYPES.has(mimeType)) {
        logger.warn('Invalid file type');
        onUnsupportedFormat();
        return;
      }

      closeModalForEpub();

      const fileDirectory = await getPrivateDirectory();
      const newUri = `${fileDirectory}${cleanBookName(name)}.${fileExtension}`;
      await moveFile(oldUri, newUri);

      const { title, author, desc, bookCover } = await processBookMetadata(newUri);

      const book: UploadedBook = {
        id: uuidv4(),
        title: title || '',
        mimeType: mimeType || '',
        size: size || 0,
        author: author || '',
        isFinished: 0,
        filePath: newUri,
        cover: bookCover,
        description: desc
      };

      const fileName = `${cleanBookName(name)}.${fileExtension}`;
      const backendBook = prepareBackendBook(book, { newUri, fileName, mimeType: mimeType || '' });

      const hasAlreadyExistingBook = await bookExists(title || '', author || '');
      if (hasAlreadyExistingBook) {
        logger.warn(`This Book "${title}" already exists`);
        onExistingBookFound(book);
      } else {
        await insertBook(book);
        onUploadSuccess(backendBook);
        logger.info('Book uploaded successfully');
      }
    } catch (error) {
      logger.error(error);
    } finally {
      isPickingDocument = false;
    }
  }
};
