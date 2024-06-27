import * as FileSystem from 'expo-file-system';
import JSZip from 'jszip';
import { XMLParser } from 'fast-xml-parser';
import { logger } from '../../utils';

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

    return { metadata: metadataNode, manifest: manifestNode.item, zipFile };
  } catch (error) {
    logger.error('Error processing EPUB file1:', error);
    return null;
  }
};
