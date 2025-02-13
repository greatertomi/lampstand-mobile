// eslint-disable-next-line max-classes-per-file
import * as FileSystem from 'expo-file-system';
import { XMLParser } from 'fast-xml-parser';
import JSZip from 'jszip';

import { EpubBookMetadata, EpubManifestItem, ManifestItem, Metadata } from '../types';

import { logger } from './logger';

class EpubProcessingError extends Error {
  constructor(
    message: string,
    public readonly cause?: Error
  ) {
    super(message);
    this.name = 'EpubProcessingError';
  }
}

export class EpubProcessor {
  private parser: XMLParser;

  private readonly filePath: string;

  zipFile: JSZip | null = null;

  constructor(filePath: string) {
    this.filePath = filePath;
    this.parser = new XMLParser({
      ignoreAttributes: false,
      removeNSPrefix: false,
      allowBooleanAttributes: true
    });
  }

  public static extractMetadataValue(property: unknown): string | null {
    if (typeof property === 'string') {
      return property;
    }

    if (Array.isArray(property)) {
      return property
        .filter(
          (item): item is { text?: string; '#text'?: string } =>
            typeof item === 'object' && (item.text !== undefined || item['#text'] !== undefined)
        )
        .map((item) => item.text || item['#text'] || '')
        .filter((text) => text.trim() !== '')
        .join(' ');
    }

    if (typeof property === 'object' && property !== null) {
      const obj = property as { text?: string; '#text'?: string };
      return obj.text || obj['#text'] || '';
    }

    return null; // Default fallback for unsupported types
  }

  private cleanMetadataKeys(obj: Metadata): EpubBookMetadata {
    const cleanObj: Metadata = {};
    Object.keys(obj).forEach((key) => {
      const cleanKey = key.replaceAll(/@_|dc:|#|opf:|xmlns:/g, '');
      const value = obj[key];

      if (Array.isArray(value)) {
        cleanObj[cleanKey] = value.map((item) => (typeof item === 'object' ? this.cleanMetadataKeys(item) : item));
      } else if (typeof value === 'object' && value !== null) {
        cleanObj[cleanKey] = this.cleanMetadataKeys(value as Metadata);
      } else {
        cleanObj[cleanKey] = value;
      }
    });

    return cleanObj;
  }

  // eslint-disable-next-line class-methods-use-this
  private cleanManifestKeys(manifest: EpubManifestItem[]): ManifestItem[] {
    return manifest.map((item) => ({
      id: item['@_id'],
      href: item['@_href'],
      mediaType: item['@_media-type']
    }));
  }

  public async processEpubFile(): Promise<{ metadata: EpubBookMetadata; manifest: ManifestItem[] } | null> {
    try {
      const fileContent = await FileSystem.readAsStringAsync(this.filePath, {
        encoding: FileSystem.EncodingType.Base64
      });
      // eslint-disable-next-line unicorn/prefer-code-point
      const arrayBuffer = Uint8Array.from(atob(fileContent), (c) => c.charCodeAt(0)).buffer;
      this.zipFile = await new JSZip().loadAsync(arrayBuffer);
      const content = await this.zipFile.file('META-INF/container.xml')?.async('string');

      if (!content) {
        throw new EpubProcessingError('Invalid EPUB file: Missing container.xml');
      }

      const result = this.parser.parse(content);
      const rootFile = result.container.rootfiles.rootfile['@_full-path'];
      const rootFileContent = await this.zipFile.file(rootFile)?.async('string');

      if (!rootFileContent) {
        throw new EpubProcessingError('Invalid EPUB file: Missing root file');
      }

      const rootResult = this.parser.parse(rootFileContent);
      const metadataNode = rootResult.package.metadata;
      const manifestNode = rootResult.package.manifest;

      return {
        metadata: this.cleanMetadataKeys(metadataNode),
        manifest: this.cleanManifestKeys(manifestNode.item)
      };
    } catch (error) {
      logger.error('Error processing EPUB file:', error);
      throw new EpubProcessingError('Failed to process EPUB file', error as Error);
    }
  }

  public async getBookImage(manifest: ManifestItem[]): Promise<string | null> {
    if (!this.zipFile) return null;

    let coverImageFile = this.findCoverImageFromManifest(manifest);
    if (!coverImageFile) {
      coverImageFile = this.findCoverImageFromSecondaryPaths();
    }
    if (!coverImageFile) {
      coverImageFile = await this.findCoverImageFromXhtml(manifest);
    }

    if (!coverImageFile) return null;

    const coverImageData = await coverImageFile.async('base64');
    return `data:image/jpeg;base64,${coverImageData}`;
  }

  private findCoverImageFromManifest(manifest: ManifestItem[]): JSZip.JSZipObject | null {
    const coverImagePath = manifest.find((item) => item.id === 'cover-image' || item.id === 'cover')?.href;
    return coverImagePath ? this.zipFile?.file(coverImagePath) || null : null;
  }

  private findCoverImageFromSecondaryPaths(): JSZip.JSZipObject | null {
    if (!this.zipFile) return null;
    const secondaryCoverImagePath = Object.keys(this.zipFile.files).find((key) => /cover.*\.(jpg|png|jpeg)/i.test(key));
    return secondaryCoverImagePath ? this.zipFile.file(secondaryCoverImagePath) : null;
  }

  private async findCoverImageFromXhtml(manifest: ManifestItem[]): Promise<JSZip.JSZipObject | null> {
    if (!this.zipFile) return null;

    const coverXhtmlPath = manifest.find((item) => item.id.toLowerCase().includes('cover'))?.href;
    if (!coverXhtmlPath) return null;
    const coverFilePaths = Object.keys(this.zipFile.files).filter((path) => path.endsWith(coverXhtmlPath));
    if (coverFilePaths.length === 0) return null;
    const fullPath = coverFilePaths[0];

    const coverXhtmlFile = this.zipFile.file(fullPath);
    if (!coverXhtmlFile) return null;

    const coverXhtmlData = await coverXhtmlFile.async('text');
    const imageUrlMatch = coverXhtmlData.match(/<img[^>]+src="([^"]+)"/);

    if (!imageUrlMatch) return null;

    const imageUrl = imageUrlMatch[1];
    const coverXhtmlBasePath = fullPath!.replace(/[^/]+$/, '');
    const resolvedImageUrl = imageUrl.startsWith('http') ? imageUrl : coverXhtmlBasePath + imageUrl;

    return this.zipFile.file(resolvedImageUrl);
  }
}

export default EpubProcessor;
