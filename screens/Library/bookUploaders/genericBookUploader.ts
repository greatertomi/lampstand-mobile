/* eslint-disable sonarjs/cognitive-complexity */
import * as DocumentPicker from 'expo-document-picker';

import { UploadedBook } from '../../../store';
import { PreinstalledBook } from '../../../types';
import { logger } from '../../../utils';

import { handleBookUpload } from './uploadHandler';

let isPickingDocument = false;

type UploadSource =
  | {
      type: 'preinstalled';
      books: PreinstalledBook[];
    }
  | ({
      type: 'user';
    } & BookUploadParams);

export type BookUploadParams = {
  onExistingBookFound: (book: UploadedBook) => void;
  onUploadSuccess: (book: FormData) => void;
  onUnsupportedFormat: () => void;
  closeModalForEpub: () => void;
  onUploadProgress: (current: number, total: number) => void;
  onUploadComplete?: (successCount: number, totalCount: number) => void;
};

const genericBookUploader = async (source: UploadSource) => {
  if (source.type === 'preinstalled') {
    await Promise.all(
      source.books.map((book: PreinstalledBook) =>
        handleBookUpload({
          name: book.filename,
          oldUri: book.secure_url,
          size: book.size || 0,
          mimeType: book.format || 'epub',
          isPreinstalled: true
        })
      )
    );
  } else {
    if (isPickingDocument) {
      logger.warn('Document picker already in progress');
      return;
    }

    isPickingDocument = true;

    try {
      const result = await DocumentPicker.getDocumentAsync({
        multiple: true
      });
      if (!result.assets || result.canceled) {
        logger.info('Upload Cancelled. Resetting Document Picking');
        return;
      }

      const selectedBooks = result.assets;
      const totalBooks = selectedBooks.length;
      let successCount = 0;

      source.closeModalForEpub();

      for (let i = 0; i < totalBooks; i++) {
        const selectedBook = selectedBooks[i];
        const { name, uri, size, mimeType } = selectedBook;
        try {
          // eslint-disable-next-line no-await-in-loop
          await handleBookUpload(
            {
              name,
              oldUri: uri,
              size: size || 0,
              mimeType: mimeType || '',
              isPreinstalled: false
            },
            {
              onExistingBookFound: source.onExistingBookFound,
              onUploadSuccess: source.onUploadSuccess,
              onUnsupportedFormat: source.onUnsupportedFormat
            }
          );
          successCount++;
        } catch (error) {
          logger.error(`Failed to upload book: ${name}`, error);
        }
        source.onUploadProgress?.(i + 1, totalBooks);
      }
      source.onUploadComplete?.(successCount, totalBooks);
    } catch (error) {
      logger.error(error);
    } finally {
      isPickingDocument = false;
    }
  }
};

export const bookUploader = async (params: BookUploadParams) => {
  await genericBookUploader({ type: 'user', ...params });
};

export const preinstalledBookUploader = async (books: PreinstalledBook[]) => {
  await genericBookUploader({ type: 'preinstalled', books });
};
