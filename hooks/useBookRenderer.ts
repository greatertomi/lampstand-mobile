import { useEffect, useState } from 'react';
import { OutputType } from 'jszip';
import { EpubBookMetadata, ManifestItem } from '../types';
import { getBookImage, processEpubFile } from '../utils';

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
      const {
        manifest: bookManifest = [],
        zipFile,
        metadata: bookMetadata = {}
      } = (await processEpubFile(bookPath)) || {};
      setManifest(bookManifest);
      setMetadata(bookMetadata);

      const bookImage = await getBookImage(bookManifest, zipFile);
      setImage(bookImage);

      const paths = zipFile ? Object.keys(zipFile.files) : [];
      setFilePaths(paths);
    })();
  }, [bookPath]);

  const getContent = async (item: ManifestItem): Promise<BookContent> => {
    const { zipFile } = (await processEpubFile(bookPath)) || {};
    const contentTypeMap: Record<string, OutputType> = {
      'application/xhtml+xml': 'string',
      'application/xml': 'string',
      'text/css': 'string',
      'image/jpeg': 'base64',
      'image/png': 'base64',
      'application/x-dtbncx+xml': 'string'
    };

    const bookContent = (await zipFile?.file(item.href)?.async(contentTypeMap[item.mediaType])) || '';
    return { type: contentTypeMap[item.mediaType], content: String(bookContent) };
  };

  return { manifest, filePaths, metadata, image, getContent };
};
