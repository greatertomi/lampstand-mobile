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
};

const genericBookUploader = async (source: UploadSource) => {
  if (source.type === 'preinstalled') {
    await Promise.all(
      source.books.map((book: PreinstalledBook) =>
        handleBookUpload({
          name: book.filename,
          oldUri: book.url,
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
      const result = await DocumentPicker.getDocumentAsync({});
      if (!result.assets || result.canceled) {
        logger.info('Upload Cancelled. Resetting Document Picking');
        return;
      }

      const { uri, name, size, mimeType } = result.assets[0];
      source.closeModalForEpub();

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
