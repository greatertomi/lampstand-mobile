import * as FileSystem from 'expo-file-system';
import JSZip from 'jszip';
import { XMLParser } from 'fast-xml-parser';
import { logger } from './logger';
import { EpubManifestItem, ManifestItem, Metadata } from '../types';

export const cleanMetadataKeys = (obj: Metadata): Metadata => {
  const cleanObj: Metadata = {};

  Object.keys(obj).forEach((key) => {
    const cleanKey = key.replaceAll(/@_|dc:|#|opf:|xmlns:/g, '');
    const value = obj[key];

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
