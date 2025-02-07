import * as FileSystem from 'expo-file-system';
import { XMLParser } from 'fast-xml-parser';
import JSZip from 'jszip';

import { EpubBookMetadata, EpubManifestItem, ManifestItem, Metadata } from '../types';

import { logger } from './logger';

const extractTitle = (metadata: Metadata): string => {
  const { title } = metadata;

  if (!title) {
    return '';
  }

  if (typeof title === 'string') {
    return title;
  }
  if (Array.isArray(title)) {
    return title
      .filter((item): item is { text?: string; '#text'?: string } => typeof item === 'object' && item !== null)
      .map((item) => item.text || item['#text'] || '')
      .filter((text) => text.trim() !== '')
      .join(' ');
  }

  if (typeof title === 'object') {
    for (const key of Object.keys(title)) {
      const value = (title as { [key: string]: string })[key];

      if (!key.startsWith('@')) {
        return value;
      }
    }
  }
  return '';
};

export const cleanMetadataKeys = (obj: Metadata): EpubBookMetadata => {
  const cleanObj: Metadata = {};

  Object.keys(obj).forEach((key) => {
    const cleanKey = key.replaceAll(/@_|dc:|#|opf:|xmlns:/g, '');
    const value = obj[key];

    if (cleanKey === 'title') {
      cleanObj[cleanKey] = extractTitle({ title: value });
      return;
    }

    if (Array.isArray(value)) {
      cleanObj[cleanKey] = value.map((item) => (typeof item === 'object' ? cleanMetadataKeys(item) : item));
    } else if (typeof value === 'object' && value !== null) {
      cleanObj[cleanKey] = cleanMetadataKeys(value as Metadata);
    } else {
      cleanObj[cleanKey] = value;
    }
  });

  return cleanObj;
};

export const cleanManifestKeys = (manifest: EpubManifestItem[]): ManifestItem[] =>
  manifest.map((item) => ({
    id: item['@_id'],
    href: item['@_href'],
    mediaType: item['@_media-type']
  }));

export const processEpubFile = async (bookPath: string) => {
  try {
    const fileContent = await FileSystem.readAsStringAsync(bookPath, { encoding: FileSystem.EncodingType.Base64 });
    // eslint-disable-next-line unicorn/prefer-code-point
    const arrayBuffer = Uint8Array.from(atob(fileContent), (c) => c.charCodeAt(0)).buffer;
    const zip = new JSZip();
    const zipFile = await zip.loadAsync(arrayBuffer);
    const content = await zipFile.file('META-INF/container.xml')?.async('string');

    if (!content) {
      throw new Error('Invalid EPUB file: Missing container.xml');
    }

    const parser = new XMLParser({
      ignoreAttributes: false,
      removeNSPrefix: false
    });
    const result = parser.parse(content);
    const rootFile = result.container.rootfiles.rootfile['@_full-path'];
    const rootFileContent = await zipFile.file(rootFile)?.async('string');

    if (!rootFileContent) {
      throw new Error('Invalid EPUB file: Missing root file');
    }

    const rootResult = parser.parse(rootFileContent);
    const metadataNode = rootResult.package.metadata;
    const manifestNode = rootResult.package.manifest;

    return { metadata: cleanMetadataKeys(metadataNode), manifest: cleanManifestKeys(manifestNode.item), zipFile };
  } catch (error) {
    logger.error('Error processing EPUB file1:', error);
    return null;
  }
};

export const parseTocNcx = (ncxContent: string) => {
  try {
    const parser = new XMLParser({
      ignoreAttributes: false,
      removeNSPrefix: false
    });
    const result = parser.parse(ncxContent);
    const navPoints = result.ncx.navMap.navPoint;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return navPoints.map((navPoint: any) => ({
      id: navPoint['@_id'],
      label: navPoint.navLabel.text,
      contentSrc: navPoint.content['@_src']
    }));
  } catch (error) {
    logger.error('Error parsing TOC NCX:', error);
    return [];
  }
};

export const getBookImage = async (manifest: ManifestItem[], zipFile?: JSZip): Promise<string | null> => {
  if (!zipFile) return null;

  let coverImageFile = findCoverImageFromManifest(manifest, zipFile);
  if (!coverImageFile) {
    coverImageFile = findCoverImageFromSecondaryPaths(zipFile);
  }
  if (!coverImageFile) {
    coverImageFile = await findCoverImageFromXhtml(manifest, zipFile);
  }

  if (!coverImageFile) return null;

  const coverImageData = await coverImageFile.async('base64');
  return `data:image/jpeg;base64,${coverImageData}`;
};

const findCoverImageFromManifest = (manifest: ManifestItem[], zipFile: JSZip): JSZip.JSZipObject | null => {
  const coverImagePath = manifest.find((item) => item.id === 'cover-image' || item.id === 'cover')?.href;
  return coverImagePath ? zipFile.file(coverImagePath) : null;
};

const findCoverImageFromSecondaryPaths = (zipFile: JSZip): JSZip.JSZipObject | null => {
  const secondaryCoverImagePath = Object.keys(zipFile.files).find((key) => /cover.*\.(jpg|png|jpeg)/i.test(key));
  return secondaryCoverImagePath ? zipFile.file(secondaryCoverImagePath) : null;
};

const findCoverImageFromXhtml = async (manifest: ManifestItem[], zipFile: JSZip): Promise<JSZip.JSZipObject | null> => {
  const coverXhtmlPath = manifest.find(
    (item) => item.id.toLowerCase().includes('cover') || item.id.toLowerCase().includes('cover-image')
  )?.href;

  if (!coverXhtmlPath) return null;
  const coverFilePaths = Object.keys(zipFile.files).filter((path) => path.endsWith(coverXhtmlPath));
  if (coverFilePaths.length === 0) return null;
  const fullPath = coverFilePaths[0];
  const coverXhtmlFile = zipFile.file(fullPath);

  if (!coverXhtmlFile) return null;

  const coverXhtmlData = await coverXhtmlFile.async('text');
  const imageUrlMatch = coverXhtmlData.match(/<img[^>]+src="([^"]+)"/);

  if (!imageUrlMatch) return null;

  const imageUrl = imageUrlMatch[1];
  const coverXhtmlBasePath = fullPath.replace(/[^/]+$/, '');
  const resolvedImageUrl = imageUrl.startsWith('http') ? imageUrl : coverXhtmlBasePath + imageUrl;

  return zipFile.file(resolvedImageUrl);
};
