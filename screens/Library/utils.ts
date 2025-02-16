import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

import { bookExists, insertBook, UploadedBook } from '../../store';
import { EpubBookMetadata } from '../../types';
import { getPrivateDirectory, logger, EpubProcessor, processMimeType } from '../../utils';

type BookUploadParams = {
  onExistingBookFound: (book: UploadedBook) => void;
  onUploadSuccess: (book: FormData) => void;
};

export const cleanBookName = (bookName: string) => {
  const bookNameWithoutExtension = bookName.split('.').slice(0, -1).join('.').toLowerCase();
  return bookNameWithoutExtension.replaceAll(/[^\d A-Za-z]/g, '').replaceAll(' ', '_');
};

export const processBookMetadata = async (newUri: string) => {
  const processor = new EpubProcessor(newUri);
  const { metadata, manifest } = (await processor.processEpubFile()) || {};

  const bookCover = await processor.getBookImage(manifest || []);
  const { creator, description, title: rawTitle }: EpubBookMetadata = metadata || {};

  const title = EpubProcessor.extractMetadataValue(rawTitle) || null;
  const author = EpubProcessor.extractMetadataValue(creator) || null;
  const desc = EpubProcessor.extractMetadataValue(description) || 'No description available, check back later!';

  return { title, author, desc, bookCover };
};

export const moveFile = async (oldUri: string, newUri: string) => {
  await FileSystem.moveAsync({ from: oldUri, to: newUri });
};

const prepareBackendBook = (book: UploadedBook, file: { newUri: string; fileName: string; mimeType: string }) => {
  const payload = new FormData();
  payload.append('title', book.title || '');
  payload.append('author', book.author || '');
  payload.append('cover', book.cover || '');
  payload.append('format', processMimeType(file.mimeType));
  payload.append('file', {
    uri: file.newUri,
    name: file.fileName,
    type: file.mimeType || 'application/octet-stream'
  } as unknown as Blob);
  return payload;
};

// eslint-disable-next-line sonarjs/cognitive-complexity
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
    }
  }
};
