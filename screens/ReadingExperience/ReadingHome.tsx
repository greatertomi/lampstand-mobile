import React from 'react';
import { View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PrimaryButton, SecondaryButton } from '../../components';
import { utilities } from '../../styles';
import { UploadedBook } from '../../store/database/types';
import { getPrivateDirectory } from '../../utils';
import { insertBook } from '../../store/database';
import { RootStackParamList } from '../../routes/types';

const ALLOWED_MIME_TYPES = new Set(['application/epub+zip', 'application/pdf']);

const cleanBookName = (bookName: string) => {
  const bookNameWithoutExtension = bookName.split('.').slice(0, -1).join('.').toLowerCase();
  return bookNameWithoutExtension.replaceAll(/[^\d A-Za-z]/g, '').replaceAll(' ', '_');
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ReadingHome'>;

export const ReadingHome = () => {
  const navigation = useNavigation<NavigationProp>();

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleUploadBook = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.assets) {
      try {
        const { uri: oldUri, name, size, mimeType } = result.assets[0];
        const title = name.split('.')[0];
        const fileExtension = name.split('.').pop();

        if (mimeType && !ALLOWED_MIME_TYPES.has(mimeType)) {
          console.log('Invalid file type');
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

        console.log('Book to upload ->', { ...book, fileExtension });
        await insertBook(book);
        console.log('Book uploaded');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View style={[utilities.mt_5, utilities.p_5, utilities.gap_2]}>
      <PrimaryButton title="Upload a book" onPress={handleUploadBook} />
      <SecondaryButton title="Book List" onPress={() => navigation.navigate('BookList')} />
    </View>
  );
};
