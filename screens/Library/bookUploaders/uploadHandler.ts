import { v4 as uuidv4 } from 'uuid';

import { bookExists, insertBook, UploadedBook } from '../../../store';
import { getPrivateDirectory, logger } from '../../../utils';

import { cleanBookName, moveFile, prepareBackendBook, processBookMetadata } from './utils';

type UploadInfo = {
  name: string;
  oldUri: string;
  size: number;
  mimeType: string;
  isPreinstalled: boolean;
};

type OptionalCallbacks = {
  onExistingBookFound?: (book: UploadedBook) => void;
  onUploadSuccess?: (book: FormData) => void;
  onUnsupportedFormat?: () => void;
};

const ALLOWED_MIME_TYPES = new Set(['application/epub+zip', 'epub']);

export const handleBookUpload = async (
  { name, oldUri, size, mimeType, isPreinstalled }: UploadInfo,
  callbacks: OptionalCallbacks = {}
) => {
  const fileExtension = name.split('.').pop();

  if (mimeType && !ALLOWED_MIME_TYPES.has(mimeType)) {
    logger.warn('Invalid file type');
    callbacks.onUnsupportedFormat?.();
    return;
  }

  const fileDirectory = await getPrivateDirectory();
  const newUri = `${fileDirectory}${cleanBookName(name)}.${fileExtension}`;

  if (!isPreinstalled) {
    await moveFile(oldUri, newUri);
  }

  const { title, author, desc, bookCover } = await processBookMetadata(newUri);

  const book: UploadedBook = {
    id: uuidv4(),
    title: title || name,
    mimeType: mimeType || 'application/epub+zip',
    size,
    author: author || 'Unknown Author',
    isFinished: 0,
    filePath: isPreinstalled ? oldUri : newUri,
    cover: bookCover || '',
    description: desc || ''
  };

  if (isPreinstalled) {
    await insertBook(book);
    logger.info('Preinstalled book uploaded successfully');
    return;
  }

  const hasAlreadyExistingBook = await bookExists(title || '', author || '');
  if (hasAlreadyExistingBook) {
    logger.warn(`This Book "${title}" already exists`);
    callbacks.onExistingBookFound?.(book);
  } else {
    await insertBook(book);
    const fileName = `${cleanBookName(name)}.${fileExtension}`;
    const backendBook = prepareBackendBook(book, {
      newUri,
      fileName,
      mimeType: mimeType || ''
    });
    callbacks.onUploadSuccess?.(backendBook);
    logger.info('Book uploaded successfully');
  }
};
