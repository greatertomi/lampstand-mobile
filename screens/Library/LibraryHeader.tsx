import React, { Dispatch, SetStateAction, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { HeadingLarge } from '../../components';
import { Theme, useTheme } from '../../styles';
import { cleanBookName, getBookImage, getPrivateDirectory, logger, processEpubFile } from '../../utils';
import { UploadedBook } from '../../store/database/types';
import { bookExists, insertBook } from '../../store/database';
import { epubBookMetadata } from '../../types';
import { BookToast } from './BookToast';

const moveFile = async (oldUri: string, newUri: string) => {
  await FileSystem.moveAsync({ from: oldUri, to: newUri });
};

const processBookMetadata = async (newUri: string) => {
  const { zipFile, metadata, manifest } = (await processEpubFile(newUri)) || {};
  const bookCover = await getBookImage(manifest || [], zipFile);
  const { creator, description, title }: epubBookMetadata = metadata || {};

  const author = creator && typeof creator === 'object' ? creator.text : creator;
  const desc =
    typeof description === 'string' ? description : description?.text || 'No description available, check back later!';

  return { title, author, desc, bookCover };
};

const handleBookUpload = async (
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

export const LibraryHeader = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const [uploadedBook, setUploadedBook] = useState<UploadedBook | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadDuplicate, setUploadDuplicate] = useState(false);

  return (
    <>
      <View style={styles.headerContainer}>
        <HeadingLarge>Library</HeadingLarge>
        <Pressable
          onPress={() => handleBookUpload(setUploadDuplicate, setUploadedBook, setUploadSuccess)}
          style={({ pressed }) => [styles.iconContainer, pressed && { opacity: 0.5 }]}
        >
          <Feather name="share" size={20} color={theme.colors.background} />
        </Pressable>
      </View>
      <BookToast
        book={uploadedBook}
        uploadSuccess={uploadSuccess}
        uploadDuplicate={uploadDuplicate}
        setUploadSuccess={setUploadSuccess}
        setUploadDuplicate={setUploadDuplicate}
      />
    </>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      top: 31,
      height: 74
    },
    iconContainer: {
      backgroundColor: theme.colors.primary,
      width: 38,
      height: 35,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
