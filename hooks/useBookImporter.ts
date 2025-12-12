import { DocumentPickerAsset } from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Linking from 'expo-linking';
import { useCallback, useEffect } from 'react';

import { UploadedBook } from '../store';
import { logger } from '../utils';
import { processDocument } from '../utils/handle-book-upload';

type BookUploadParams = {
  onExistingBookFound: (book: UploadedBook) => void;
  onUploadSuccess: (book: FormData) => void;
  onUnsupportedFormat: () => void;
  closeModalForEpub: () => void;
  onBookImported?: (book: UploadedBook) => void;
};

/**
 * A hook to handle importing books shared from outside the app.
 * @param params Callbacks for the upload process.
 */
export const useBookImporter = (params: BookUploadParams) => {
  const handleIncomingURL = useCallback(
    async (url: string) => {
      try {
        if (!url) {
          return;
        }

        const isFileUri = url.startsWith('file://');
        const isContentUri = url.startsWith('content://');

        if (!isFileUri && !isContentUri) {
          return;
        }

        let processUri = url;
        if (isContentUri) {
          const cacheDir = FileSystem.cacheDirectory;
          const fileName = url.split('/').pop() || `imported_${Date.now()}.epub`;
          const cachedUri = `${cacheDir}${fileName}`;

          try {
            await FileSystem.copyAsync({
              from: url,
              to: cachedUri
            });
            processUri = cachedUri;
          } catch (copyError) {
            logger.error('Failed to copy content URI to cache:', copyError);
            params.onUnsupportedFormat();
            return;
          }
        }

        const fileInfo = await FileSystem.getInfoAsync(processUri);

        if (!fileInfo.exists) {
          logger.warn('File from URL does not exist:', processUri);
          params.onUnsupportedFormat();
          return;
        }

        let fileName = processUri.split('/').pop() || 'unknown.epub';
        if (!fileName.toLowerCase().endsWith('.epub')) {
          fileName = `${fileName}.epub`;
        }

        const asset: DocumentPickerAsset = {
          uri: processUri,
          name: fileName,
          size: fileInfo.size,
          mimeType: 'application/epub+zip',
          lastModified: undefined,
          file: undefined
        };

        await processDocument(asset, params, true);
      } catch (error) {
        logger.error('Failed to handle incoming file:', error);
        params.onUnsupportedFormat();
      }
    },
    [params]
  );

  useEffect(() => {
    // 1. Handle the case where the app is launched from a file.
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleIncomingURL(url);
      }
    });

    // 2. Handle cases where a file is shared while the app is already open.
    const subscription = Linking.addEventListener('url', (event) => {
      handleIncomingURL(event.url);
    });

    // 3. Clean up the listener.
    return () => {
      subscription.remove();
    };
  }, [handleIncomingURL, params]);
};
