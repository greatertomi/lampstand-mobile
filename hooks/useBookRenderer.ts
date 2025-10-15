import { OutputType } from 'jszip';
import { useEffect, useState } from 'react';

import { EpubBookMetadata, ManifestItem } from '../types';
import { EpubProcessor } from '../utils';
import { resolveBookPath } from '../utils/path-migration';

export type BookContent = {
  type: OutputType;
  content: string;
};

interface UseBookRendererData {
  manifest: ManifestItem[] | undefined;
  filePaths: string[];
  metadata: EpubBookMetadata | null;
  image: string | null;
  getContent: (item: ManifestItem) => Promise<BookContent>;
}

export const useBookRenderer = (bookPath: string): UseBookRendererData => {
  const [manifest, setManifest] = useState<ManifestItem[]>();
  const [metadata, setMetadata] = useState<EpubBookMetadata | null>(null);
  const [filePaths, setFilePaths] = useState<string[]>([]);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      // Resolve the book path (convert relative to absolute if needed)
      const resolvedBookPath = await resolveBookPath(bookPath);
      const epubProcessor = new EpubProcessor(resolvedBookPath);

      const processedData = await epubProcessor.processEpubFile();

      if (!processedData) {
        throw new Error('Failed to process EPUB file');
      }
      const { manifest: bookManifest = [], metadata: bookMetadata = {} } = processedData;
      setManifest(bookManifest);
      setMetadata(bookMetadata);

      const bookImage = await epubProcessor.getBookImage(bookManifest);
      setImage(bookImage);

      const paths = epubProcessor.zipFile ? Object.keys(epubProcessor.zipFile.files) : [];
      setFilePaths(paths);
    })();
  }, [bookPath]);

  const getContent = async (item: ManifestItem): Promise<BookContent> => {
    // Resolve the book path (convert relative to absolute if needed)
    const resolvedBookPath = await resolveBookPath(bookPath);
    const epubProcessor = new EpubProcessor(resolvedBookPath);
    await epubProcessor.processEpubFile();
    const contentTypeMap: Record<string, OutputType> = {
      'application/xhtml+xml': 'string',
      'application/xml': 'string',
      'text/css': 'string',
      'image/jpeg': 'base64',
      'image/png': 'base64',
      'application/x-dtbncx+xml': 'string'
    };

    const bookContent = (await epubProcessor.zipFile?.file(item.href)?.async(contentTypeMap[item.mediaType])) || '';
    return { type: contentTypeMap[item.mediaType], content: String(bookContent) };
  };

  return { manifest, filePaths, metadata, image, getContent };
};
