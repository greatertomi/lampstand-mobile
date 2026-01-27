import { DocumentPickerAsset } from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Linking from 'expo-linking';
import { useCallback, useEffect, useRef, useState } from 'react';

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

const EPUB_MIME_TYPE = 'application/epub+zip';
const EPUB_EXTENSION = '.epub';

const isValidBookUri = (url: string): boolean => url.startsWith('file://') || url.startsWith('content://');

const normalizeFileName = (filePath: string): string => {
  const fileName = filePath.split('/').pop() || `unknown${EPUB_EXTENSION}`;
  return fileName.toLowerCase().endsWith(EPUB_EXTENSION) ? fileName : `${fileName}${EPUB_EXTENSION}`;
};

const copyContentUriToCache = async (contentUri: string): Promise<string> => {
  const cacheDir = FileSystem.cacheDirectory;
  const fileName = contentUri.split('/').pop() || `imported_${Date.now()}${EPUB_EXTENSION}`;
  const cachedUri = `${cacheDir}${fileName}`;

  await FileSystem.copyAsync({
    from: contentUri,
    to: cachedUri
  });

  return cachedUri;
};

const resolveProcessUri = async (url: string): Promise<{ uri: string; cachedPath: string | null }> => {
  if (url.startsWith('content://')) {
    const cachedPath = await copyContentUriToCache(url);
    return { uri: cachedPath, cachedPath };
  }
  return { uri: url, cachedPath: null };
};

/**
 * Creates a DocumentPickerAsset from file info.
 * Note: This should only be called after verifying fileInfo.exists is true.
 */
const createAssetFromFileInfo = (
  uri: string,
  fileInfo: FileSystem.FileInfo & { exists: true }
): DocumentPickerAsset => ({
  uri,
  name: normalizeFileName(uri),
  size: fileInfo.size ?? 0,
  mimeType: EPUB_MIME_TYPE,
  lastModified: undefined,
  file: undefined
});

/**
 * Safely deletes a cached file.
 */
const cleanupCachedFile = async (filePath: string | null): Promise<void> => {
  if (!filePath) return;

  try {
    await FileSystem.deleteAsync(filePath, { idempotent: true });
  } catch (error) {
    logger.error('Failed to cleanup cached file:', error);
  }
};

/**
 * A hook to handle importing books shared from outside the app.
 * @param params Callbacks for the upload process.
 */
export const useBookImporter = (params: BookUploadParams) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const isMountedRef = useRef(true);

  const handleIncomingURL = useCallback(
    async (url: string) => {
      if (!url || isProcessing || !isValidBookUri(url)) {
        return;
      }

      setIsProcessing(true);
      let cachedFilePath: string | null = null;

      try {
        const { uri: processUri, cachedPath } = await resolveProcessUri(url);
        cachedFilePath = cachedPath;

        const fileInfo = await FileSystem.getInfoAsync(processUri);

        if (!fileInfo.exists) {
          logger.warn('File from URL does not exist:', processUri);
          if (isMountedRef.current) {
            params.onUnsupportedFormat();
          }
          return;
        }

        // Safe to assert exists: true since we checked above
        const asset = createAssetFromFileInfo(processUri, fileInfo as FileSystem.FileInfo & { exists: true });

        if (isMountedRef.current) {
          await processDocument(asset, params, true);
        }

        await cleanupCachedFile(cachedFilePath);
      } catch (error) {
        logger.error('Failed to handle incoming file:', error);
        if (isMountedRef.current) {
          params.onUnsupportedFormat();
        }
        await cleanupCachedFile(cachedFilePath);
      } finally {
        if (isMountedRef.current) {
          setIsProcessing(false);
        }
      }
    },
    [params, isProcessing]
  );

  useEffect(() => {
    isMountedRef.current = true;

    // 1. Handle the case where the app is launched from a file.
    Linking.getInitialURL().then((url) => {
      if (url && isMountedRef.current) {
        handleIncomingURL(url);
      }
    });

    // 2. Handle cases where a file is shared while the app is already open.
    const subscription = Linking.addEventListener('url', (event) => {
      handleIncomingURL(event.url);
    });

    // 3. Clean up the listener.
    return () => {
      isMountedRef.current = false;
      subscription.remove();
    };
  }, [handleIncomingURL]);
};
