import * as FileSystem from 'expo-file-system';
import JSZip from 'jszip';
import { XMLParser } from 'fast-xml-parser';
import * as DocumentPicker from 'expo-document-picker';
import { getPrivateDirectory, logger } from '../../utils';
import { UploadedBook } from '../../store/database/types';
import { insertBook } from '../../store/database';

const cleanBookName = (bookName: string) => {
  const bookNameWithoutExtension = bookName.split('.').slice(0, -1).join('.').toLowerCase();
  return bookNameWithoutExtension.replaceAll(/[^\d A-Za-z]/g, '').replaceAll(' ', '_');
};

export const handleUploadBook = async () => {
  const ALLOWED_MIME_TYPES = new Set(['application/epub+zip', 'application/pdf']);
  const result = await DocumentPicker.getDocumentAsync({});

  if (result.assets) {
    try {
      const { uri: oldUri, name, size, mimeType } = result.assets[0];
      const title = name.split('.')[0];
      const fileExtension = name.split('.').pop();

      if (mimeType && !ALLOWED_MIME_TYPES.has(mimeType)) {
        logger.warn('Invalid file type');
        return;
      }

      const fileDirectory = await getPrivateDirectory();
      const newUri = `${fileDirectory}${cleanBookName(name)}.${fileExtension}`;
      await FileSystem.moveAsync({ from: oldUri, to: newUri });
      const book: UploadedBook = {
        title,
        mimeType: mimeType || '',
        size: size || 0,
        name,
        filePath: newUri
      };

      await insertBook(book);
      logger.info('Book uploaded');
    } catch (error) {
      logger.error(error);
    }
  }
};

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
    throw error;
  }
};
