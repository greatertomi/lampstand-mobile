import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { v4 as uuidv4 } from 'uuid';

import { bookExists, insertBook, UploadedBook } from '../store';

import { EpubProcessor } from './EpubProcessor';
import { logger } from './logger';
import { convertAbsoluteToRelative } from './path-migration';
import { getPrivateDirectory } from './private-directory';
import { processMimeType } from './processMimeType';

/**
 * Custom error class for unified error handling during book processing.
 */
class BookProcessingError extends Error {
  constructor(
    message: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'BookProcessingError';
  }
}

type BookUploadParams = {
  onExistingBookFound: (book: UploadedBook) => void;
  onUploadSuccess: (book: FormData) => void;
  onUnsupportedFormat: () => void;
  closeModalForEpub: () => void;
  onBookImported?: (book: UploadedBook) => void;
};

let isPickingDocument = false;

/**
 * Cleans a book title for use as a filename.
 * It removes the file extension, converts to lowercase, replaces invalid characters,
 * and substitutes spaces with underscores.
 * @param bookName - The original name of the book file.
 * @returns A sanitized string suitable for a filename.
 */
const cleanBookName = (bookName: string): string => {
  if (!bookName) {
    return `untitled_${uuidv4()}`; // Return a unique name for empty inputs
  }
  const lastDotIndex = bookName.lastIndexOf('.');
  const nameWithoutExtension = lastDotIndex === -1 ? bookName : bookName.slice(0, Math.max(0, lastDotIndex));

  return nameWithoutExtension
    .toLowerCase()
    .replaceAll(/[^\s\w-]/g, '') // Allow alphanumeric, whitespace, and hyphens
    .trim()
    .replaceAll(/\s+/g, '_'); // Replace one or more spaces with a single underscore
};

/**
 * Asynchronously moves a file from a source URI to a destination URI.
 * This function includes error handling and logging for the move operation.
 * @param oldUri - The source URI of the file.
 * @param newUri - The destination URI for the file.
 * @throws {BookProcessingError} If the file move fails.
 */
const moveFile = async (oldUri: string, newUri: string): Promise<void> => {
  try {
    await FileSystem.moveAsync({ from: oldUri, to: newUri });
  } catch (error) {
    logger.error(`Failed to move file from ${oldUri} to ${newUri}`, error);
    throw new BookProcessingError('Could not save the book file locally.', error as Error);
  }
};

/**
 * Processes an EPUB file to extract its metadata and cover image.
 * @param newUri - The file URI of the processed EPUB.
 * @returns An object containing the book's title, author, description, and cover image.
 * @throws {BookProcessingError} If metadata processing fails at any stage.
 */
const processBookMetadata = async (newUri: string) => {
  try {
    const processor = new EpubProcessor(newUri);
    const processedData = await processor.processEpubFile();

    if (!processedData?.metadata || !processedData?.manifest) {
      throw new Error('Failed to extract required metadata from the EPUB file.');
    }

    const { metadata, manifest } = processedData;
    const bookCover = await processor.getBookImage(manifest);

    const title = EpubProcessor.extractMetadataValue(metadata.title) || 'Unknown Title';
    const author = EpubProcessor.extractMetadataValue(metadata.creator) || 'Unknown Author';
    const desc = EpubProcessor.extractMetadataValue(metadata.description) || 'No description available.';

    return { title, author, desc, bookCover };
  } catch (error) {
    logger.error(`Error processing metadata for file: ${newUri}`, error);
    throw new BookProcessingError(
      'Could not read book details. The file might be corrupted or in an unsupported format.',
      error as Error
    );
  }
};

/**
 * Prepares a FormData object for sending the book data to the backend.
 * @param book - The book data object stored in the local database.
 * @param file - Details about the saved file.
 * @returns A FormData object ready for upload.
 */
const prepareBackendBook = (
  book: UploadedBook,
  file: { newUri: string; fileName: string; mimeType: string }
): FormData => {
  const payload = new FormData();
  payload.append('id', book.id);
  payload.append('title', book.title || '');
  payload.append('author', book.author || '');
  payload.append('cover', book.cover || '');
  payload.append('format', processMimeType(file.mimeType));
  payload.append('file', {
    uri: file.newUri,
    name: file.fileName,
    type: file.mimeType || 'application/octet-stream'
  } as unknown as Blob); // React Native's specific format for file uploads
  return payload;
};

/**
 * Handles the end-to-end process of selecting and processing a single book file.
 * @param asset - The file asset selected by the user.
 * @param params - Callbacks for handling different outcomes of the process.
 * @param isExternalImport - Whether the book is being imported from outside the app (e.g., via file sharing).
 */
export const processDocument = async (
  asset: DocumentPicker.DocumentPickerAsset,
  params: BookUploadParams,
  isExternalImport = false
): Promise<void> => {
  const { onExistingBookFound, onUploadSuccess, onUnsupportedFormat, closeModalForEpub, onBookImported } = params;
  let newUri: string | null = null;

  try {
    closeModalForEpub();

    const { uri: oldUri, name, size, mimeType } = asset;
    const fileExtension = name.split('.').pop() || 'epub'; // Default to epub if no extension

    const fileDirectory = await getPrivateDirectory(); // Ensures the directory exists
    const cleanedName = cleanBookName(name);
    newUri = `${fileDirectory}${cleanedName}.${fileExtension}`;

    await moveFile(oldUri, newUri);

    const { title, author, desc, bookCover } = await processBookMetadata(newUri);

    // Convert absolute path to relative path for storage
    const relativePath = await convertAbsoluteToRelative(newUri);
    if (!relativePath) {
      throw new BookProcessingError('Failed to convert file path to relative path');
    }

    const book: UploadedBook = {
      id: uuidv4(),
      title,
      mimeType: mimeType || 'application/epub+zip',
      size: size || 0,
      author,
      isFinished: 0,
      filePath: relativePath, // Store relative path instead of absolute
      cover: bookCover,
      description: desc
    };

    const hasAlreadyExistingBook = bookExists(title, author);
    if (hasAlreadyExistingBook) {
      logger.warn(`This Book "${title}" already exists.`);
      onExistingBookFound(book);
      // Clean up the newly moved file as it's a duplicate
      await FileSystem.deleteAsync(oldUri, { idempotent: true });
      if (newUri && newUri !== oldUri) {
        await FileSystem.deleteAsync(newUri, { idempotent: true });
      }
      return;
    }

    insertBook(book);

    const backendBook = prepareBackendBook(book, {
      newUri,
      fileName: `${cleanedName}.${fileExtension}`,
      mimeType: book.mimeType
    });
    onUploadSuccess(backendBook);

    if (isExternalImport && onBookImported) {
      onBookImported(book);
    }
  } catch (error) {
    logger.error('An error occurred during book processing:', error);
    // If a file was already moved, clean it up on failure.
    if (newUri) {
      await FileSystem.deleteAsync(newUri, { idempotent: true });
    }
    // Decide which callback to use based on the error.
    if (error instanceof BookProcessingError) {
      logger.error('BookProcessingError:', error.message);
    }
    onUnsupportedFormat(); // Generic failure callback
  }
};

/**
 * Initiates the document picker and orchestrates the book upload process.
 * @param params - Callbacks to handle various outcomes (success, failure, etc.).
 */
export const handleBookUpload = async (params: BookUploadParams) => {
  const ALLOWED_MIME_TYPES = new Set(['application/epub+zip']);

  if (isPickingDocument) {
    logger.warn('Document picker is already in progress.');
    return;
  }

  try {
    isPickingDocument = true;
    const result = await DocumentPicker.getDocumentAsync({});

    if (result.canceled || !result.assets?.length) {
      logger.info('Document picking was cancelled by the user.');
      return;
    }

    const asset = result.assets[0];
    if (asset.mimeType && !ALLOWED_MIME_TYPES.has(asset.mimeType)) {
      logger.warn(`Unsupported file type selected: ${asset.mimeType}`);
      params.onUnsupportedFormat();
      return;
    }

    await processDocument(asset, params);
  } catch (error) {
    logger.error('An unexpected error occurred in handleBookUpload:', error);
    params.onUnsupportedFormat(); // Fallback for any unexpected errors.
  } finally {
    isPickingDocument = false; // Ensure the lock is always released
  }
};
