import * as FileSystem from 'expo-file-system';
import { v4 as uuidv4 } from 'uuid';

import { insertBook, UploadedBook } from '../../../store';
import { PreinstalledBook } from '../../../types';
import { getPrivateDirectory, logger } from '../../../utils';

import { cleanBookName, processBookMetadata } from './utils';

const moveFile = async (sourceUri: string, newUri: string) => {
  if (sourceUri.startsWith('http')) {
    const downloadedFile = await FileSystem.downloadAsync(sourceUri, newUri);
    if (downloadedFile.status !== 200) {
      throw new Error(`Download failed with status: ${downloadedFile.status}`);
    }
  }
};

export const preinstalledBookUploader = async (books: PreinstalledBook[]) => {
  const ALLOWED_MIME_TYPES = new Set(['epub']);
  const fileDirectory = await getPrivateDirectory();

  const tasks = books.map(async (book) => {
    const fileExtension = book.filename.split('.').pop();

    if (book.format && !ALLOWED_MIME_TYPES.has(book.format)) {
      logger.warn('Invalid file type');
      return;
    }

    const newUri = `${fileDirectory}${cleanBookName(book.filename)}.${fileExtension}`;
    await moveFile(book.url, newUri);

    const { title, author, desc, bookCover } = await processBookMetadata(newUri);

    const newBook: UploadedBook = {
      id: uuidv4(),
      title: title || book.filename,
      mimeType: book.format || 'application/epub+zip',
      size: book.size || 0,
      author: author || 'Unknown Author',
      isFinished: 0,
      filePath: newUri,
      cover: bookCover || '',
      description: desc || ''
    };
    await insertBook(newBook);
    logger.info('Book uploaded successfully');
  });

  await Promise.all(tasks);
};
