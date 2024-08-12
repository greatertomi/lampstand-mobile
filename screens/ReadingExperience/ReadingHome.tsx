import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { PrimaryButton, SecondaryButton } from '../../components';
import { utilities } from '../../styles';
import { RootStackParamList } from '../../routes';
import { getBookImage, getPrivateDirectory, logger, processEpubFile } from '../../utils';
import { UploadedBook } from '../../store/database/types';
import { bookExists, createBooksTable, dropBooksTable, insertBook } from '../../store/database';
import { NewMetadata } from '../../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ReadingHome'>;

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

export const ReadingHome = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={[utilities.mt_5, utilities.p_5, utilities.gap_2]}>
      <PrimaryButton title="Upload a book" onPress={handleUploadBook} />
      <SecondaryButton title="Book List" onPress={() => navigation.navigate('BookList')} />
      <SecondaryButton title="Drop Table" onPress={dropBooksTable} />
      <SecondaryButton title="Create Table" onPress={createBooksTable} />
    </View>
  );
};
