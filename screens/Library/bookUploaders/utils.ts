import * as FileSystem from 'expo-file-system';

import { UploadedBook } from '../../../store';
import { EpubBookMetadata } from '../../../types';
import { EpubProcessor, processMimeType } from '../../../utils';

export const cleanBookName = (bookName: string) => {
  const bookNameWithoutExtension = bookName.split('.').slice(0, -1).join('.').toLowerCase();
  return bookNameWithoutExtension.replaceAll(/[^\d A-Za-z]/g, '').replaceAll(' ', '_');
};

export const processBookMetadata = async (newUri: string) => {
  const processor = new EpubProcessor(newUri);
  const { metadata, manifest } = (await processor.processEpubFile()) || {};

  const bookCover = await processor.getBookImage(manifest || []);
  const { creator, description, title: rawTitle }: EpubBookMetadata = metadata || {};

  const title = EpubProcessor.extractMetadataValue(rawTitle) || null;
  const author = EpubProcessor.extractMetadataValue(creator) || null;
  const desc = EpubProcessor.extractMetadataValue(description) || 'No description available, check back later!';

  return { title, author, desc, bookCover };
};

export const moveFile = async (oldUri: string, newUri: string) => {
  if (oldUri.startsWith('http')) {
    const downloadedFile = await FileSystem.downloadAsync(oldUri, newUri);
    if (downloadedFile.status !== 200) {
      throw new Error(`Download failed with status: ${downloadedFile.status}`);
    }
  } else {
    await FileSystem.moveAsync({ from: oldUri, to: newUri });
  }
};

export const prepareBackendBook = (
  book: UploadedBook,
  file: { newUri: string; fileName: string; mimeType: string }
) => {
  const payload = new FormData();
  payload.append('id', book.id);
  payload.append('title', book.title || '');
  payload.append('author', book.author || '');
  payload.append('cover', book.cover || '');
  payload.append('format', processMimeType(file.mimeType));
  payload.append('file', {
    uri: file.newUri,
    name: file.fileName,
    type: file.mimeType || 'application/octet-stream'
  } as unknown as Blob);
  return payload;
};
