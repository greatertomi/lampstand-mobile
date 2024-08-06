import { useEffect, useState } from 'react';
import JSZip, { OutputType } from 'jszip';
import { ManifestItem, Metadata } from '../types';
import { cleanManifestKeys, cleanMetadataKeys, parseTocNcx, processEpubFile } from '../utils';

export type BookContent = {
  type: OutputType;
  content: string;
};

interface UseBookRendererData {
  manifest: ManifestItem[] | undefined;
  filePaths: string[];
  metadata: Metadata | null;
  image: string | null;
  getContent: (item: ManifestItem) => Promise<BookContent>;
}

export const getBookImage = async (manifest: ManifestItem[], zipFile?: JSZip): Promise<string | null> => {
  let coverImageFile;
  const coverImagePath = manifest.find((item) => item.id === 'cover-image' || item.id === 'cover')?.href;
  coverImageFile = zipFile?.file(`${coverImagePath}`);

  if (!coverImageFile && zipFile) {
    const secondaryCoverImagePath = Object.keys(zipFile.files).find((key) => /cover.*\.(jpg|png)/.test(key));
    coverImageFile = zipFile.file(`${secondaryCoverImagePath}`);
  }

  if (!coverImageFile) {
    return null;
  }

  const coverImageData = await coverImageFile?.async('base64');
  return `data:image/jpeg;base64,${coverImageData}`;
};

export const useBookRenderer = (bookPath: string): UseBookRendererData => {
  const [manifest, setManifest] = useState<ManifestItem[]>();
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [filePaths, setFilePaths] = useState<string[]>([]);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { manifest: bookManifest, zipFile, metadata: bookMetadata } = (await processEpubFile(bookPath)) || {};
      const cleanedManifest = cleanManifestKeys(bookManifest);
      setManifest(cleanedManifest);
      setMetadata(cleanMetadataKeys(bookMetadata));

      const bookImage = await getBookImage(cleanedManifest, zipFile);
      setImage(bookImage);

      const paths = zipFile ? Object.keys(zipFile.files) : [];
      setFilePaths(paths);
    };

    fetchData();
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

    // TODO: Improve this to avoid repetition
    if (item.mediaType === 'application/x-dtbncx+xml') {
      const tocNcxContent = (await zipFile?.file(item.href)?.async(contentTypeMap[item.mediaType])) || '';
      const tocNcx = parseTocNcx(String(tocNcxContent));
      return { type: 'string', content: tocNcx };
    }

    // console.log('item', item);
    const bookContent = (await zipFile?.file(item.href)?.async(contentTypeMap[item.mediaType])) || '';
    // console.log('bookContent', bookContent);
    return { type: contentTypeMap[item.mediaType], content: String(bookContent) };
  };

  return { manifest, filePaths, metadata, image, getContent };
};
