import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { HeadingLarge } from '../../components';
import { Theme, useTheme } from '../../styles';
import { cleanBookName, getBookImage, getPrivateDirectory, logger, processEpubFile } from '../../utils';
import { UploadedBook } from '../../store/database/types';
import { bookExists, insertBook } from '../../store/database';
import { NewMetadata } from '../../types';

const handleBookUpload = async () => {
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
      await FileSystem.moveAsync({ from: oldUri, to: newUri });

      const { zipFile, metadata, manifest } = (await processEpubFile(newUri)) || {};
      const bookCover = await getBookImage(manifest || [], zipFile);
      const { creator, title }: NewMetadata = metadata || {};
      const author = creator?.text;

      const alreadyExistBook = await bookExists(title || '', author || '');
      if (alreadyExistBook) {
        logger.warn(`This Book "${title}" already exists`);
        return;
      }

      const book: UploadedBook = {
        title,
        mimeType: mimeType || '',
        size: size || 0,
        name: author,
        filePath: newUri,
        progress: 0,
        cover: bookCover
      };

      await insertBook(book);
      logger.info('Book uploaded successfully');
    } catch (error) {
      logger.error(error);
    }
  }
};

export const LibraryHeader = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <View style={styles.headerContainer}>
      <HeadingLarge>Library</HeadingLarge>
      <Pressable
        onPress={handleBookUpload}
        style={({ pressed }) => [styles.iconContainer, pressed && { opacity: 0.5 }]}
      >
        <Feather name="share" size={20} color={theme.colors.background} />
      </Pressable>
    </View>
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
