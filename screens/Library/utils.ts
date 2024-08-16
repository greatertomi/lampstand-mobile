import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { getBookImage, getPrivateDirectory, logger, processEpubFile } from '../../utils';
import { EpubBookMetadata } from '../../types';
import { UploadedBook } from '../../store/database/types';
import { bookExists, insertBook } from '../../store/database';

type BookUploadParams = {
  onExistingBookFound: (book: UploadedBook) => void;
  onUploadSuccess: () => void;
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

export const handleBookUpload = async ({ onExistingBookFound, onUploadSuccess }: BookUploadParams) => {
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

      const alreadyExistBook = await bookExists(title || '', author || '');
      if (alreadyExistBook) {
        logger.warn(`This Book "${title}" already exists`);
        onExistingBookFound(book);
      } else {
        await insertBook(book);
        onUploadSuccess();
        logger.info('Book uploaded successfully');
      }
    } catch (error) {
      logger.error(error);
    }
  }
};
