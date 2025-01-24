import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

import { bookExists, insertBook } from '../../store';
import { UploadedBook } from '../../store';
import { EpubBookMetadata } from '../../types';
import { getBookImage, getPrivateDirectory, logger, processEpubFile } from '../../utils';

type BookUploadParams = {
  onExistingBookFound: (book: UploadedBook) => void;
  onUploadSuccess: () => void;
  handleBackendUpload: (book: any) => void;
};

export const cleanBookName = (bookName: string) => {
  const bookNameWithoutExtension = bookName.split('.').slice(0, -1).join('.').toLowerCase();
  return bookNameWithoutExtension.replaceAll(/[^\d A-Za-z]/g, '').replaceAll(' ', '_');
};

export const processBookMetadata = async (newUri: string) => {
  const { zipFile, metadata, manifest } = (await processEpubFile(newUri)) || {};
  const bookCover = await getBookImage(manifest || [], zipFile);
  const { creator, description, title }: EpubBookMetadata = metadata || {};

  const author = creator && typeof creator === 'object' ? creator.text : creator;
  const desc =
    typeof description === 'string' ? description : description?.text || 'No description available, check back later!';

  return { title, author, desc, bookCover };
};

export const moveFile = async (oldUri: string, newUri: string) => {
  await FileSystem.moveAsync({ from: oldUri, to: newUri });
};

const getBookFileType = (bookType?: string) => {
  return bookType === 'application/epub+zip' ? 'epub' : bookType === 'application/pdf' ? 'pdf' : 'unknown';
};

export const handleBookUpload = async ({
  onExistingBookFound,
  onUploadSuccess,
  handleBackendUpload
}: BookUploadParams) => {
  const ALLOWED_MIME_TYPES = new Set(['application/epub+zip', 'application/pdf']);
  const result = await DocumentPicker.getDocumentAsync({});

  if (result.assets) {
    try {
      const { uri: oldUri, name, size, mimeType } = result.assets[0];
      const fileExtension = name.split('.').pop();

      if (mimeType && !ALLOWED_MIME_TYPES.has(mimeType)) {
        logger.warn('Invalid file type');
        return;
      }

      const fileDirectory = await getPrivateDirectory();
      const newUri = `${fileDirectory}${cleanBookName(name)}.${fileExtension}`;
      await moveFile(oldUri, newUri);

      const { title, author, desc, bookCover } = await processBookMetadata(newUri);

      const book: UploadedBook = {
        title,
        mimeType: mimeType || '',
        size: size || 0,
        author,
        filePath: newUri,
        progress: 0,
        cover: bookCover,
        description: desc
      };

      const formData = new FormData();
      formData.append('title', title || '');
      formData.append('author', author || '');
      formData.append('format', getBookFileType(mimeType) || '');
      formData.append('cover', bookCover || '');
      formData.append('file', {
        uri: newUri,
        name: `${cleanBookName(name)}.${fileExtension}`,
        type: mimeType || 'application/octet-stream'
      } as unknown as Blob);

      const hasAlreadyExistingBook = await bookExists(title || '', author || '');
      if (hasAlreadyExistingBook) {
        logger.warn(`This Book "${title}" already exists`);
        onExistingBookFound(book);
      } else {
        await insertBook(book);
        handleBackendUpload(formData);
        onUploadSuccess();
        logger.info('Book uploaded successfully');
      }
    } catch (error) {
      logger.error(error);
    }
  }
};
