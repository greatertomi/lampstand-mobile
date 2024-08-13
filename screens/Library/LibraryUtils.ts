import * as FileSystem from 'expo-file-system';
import { Dispatch, SetStateAction } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { cleanBookName, getBookImage, getPrivateDirectory, logger, processEpubFile } from '../../utils';
import { epubBookMetadata } from '../../types';
import { UploadedBook } from '../../store/database/types';
import { bookExists, insertBook } from '../../store/database';

export const processBookMetadata = async (newUri: string) => {
  const { zipFile, metadata, manifest } = (await processEpubFile(newUri)) || {};
  const bookCover = await getBookImage(manifest || [], zipFile);
  const { creator, description, title }: epubBookMetadata = metadata || {};

  const author = creator && typeof creator === 'object' ? creator.text : creator;
  const desc =
    typeof description === 'string' ? description : description?.text || 'No description available, check back later!';

  return { title, author, desc, bookCover };
};

export const moveFile = async (oldUri: string, newUri: string) => {
  await FileSystem.moveAsync({ from: oldUri, to: newUri });
};

export const handleBookUpload = async (
  setUploadDuplicate: Dispatch<SetStateAction<boolean>>,
  setUploadedBook: Dispatch<SetStateAction<UploadedBook | null>>,
  setUploadSuccess: Dispatch<SetStateAction<boolean>>
) => {
  const ALLOWED_MIME_TYPES = new Set(['application/epub+zip', 'application/pdf']);
  const result = await DocumentPicker.getDocumentAsync({});

  if (result.assets) {
    try {
      const { uri: oldUri, name, size, mimeType } = result.assets[0];
      const fileExtension = name.split('.').pop();

      if (mimeType && !ALLOWED_MIME_TYPES.has(mimeType)) {
        logger.warn('Invalid file type');
        return;
      }

      const fileDirectory = await getPrivateDirectory();
      const newUri = `${fileDirectory}${cleanBookName(name)}.${fileExtension}`;
      await moveFile(oldUri, newUri);

      const { title, author, desc, bookCover } = await processBookMetadata(newUri);

      const book: UploadedBook = {
        title,
        mimeType: mimeType || '',
        size: size || 0,
        author,
        filePath: newUri,
        progress: 0,
        cover: bookCover,
        description: desc
      };

      const alreadyExistBook = await bookExists(title || '', author || '');
      if (alreadyExistBook) {
        setUploadedBook(book);
        setUploadDuplicate(true);
        logger.warn(`This Book "${title}" already exists`);
      } else {
        await insertBook(book);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 4000);
        logger.info('Book uploaded successfully');
      }
    } catch (error) {
      logger.error(error);
    }
  }
};
