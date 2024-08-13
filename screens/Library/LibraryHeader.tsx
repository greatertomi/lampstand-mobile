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
import { NewMetadata } from '../../types';
import { BookAlert } from './BookAlert';

const moveFile = async (oldUri: string, newUri: string) => {
  await FileSystem.moveAsync({ from: oldUri, to: newUri });
};

const processBookMetadata = async (newUri: string) => {
  const { zipFile, metadata, manifest } = (await processEpubFile(newUri)) || {};
  const bookCover = await getBookImage(manifest || [], zipFile);
  const { creator, title, description }: NewMetadata = metadata || {};

  const author = creator && typeof creator === 'object' ? creator.text : creator;
  const desc =
    typeof description === 'string' ? description : description?.text || 'No description available, check back later!';

  return { title, author, desc, bookCover };
};

const handleBookUpload = async (setSuccess: Dispatch<SetStateAction<boolean>>) => {
  const ALLOWED_MIME_TYPES = new Set(['application/epub+zip', 'application/pdf']);
  const result = await DocumentPicker.getDocumentAsync({ multiple: true });

  if (result.assets) {
    await Promise.all(
      result.assets.map(async (asset) => {
        try {
          const { uri: oldUri, name, size, mimeType } = asset;
          const fileExtension = name.split('.').pop();

          if (mimeType && !ALLOWED_MIME_TYPES.has(mimeType)) {
            logger.warn('Invalid file type');
            return;
          }

          const fileDirectory = await getPrivateDirectory();
          const newUri = `${fileDirectory}${cleanBookName(name)}.${fileExtension}`;
          await moveFile(oldUri, newUri);

          const { title, author, desc, bookCover } = await processBookMetadata(newUri);

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
            cover: bookCover,
            description: desc
          };

          await insertBook(book);
          setSuccess(true);
          setTimeout(() => setSuccess(false), 4000);
          logger.info('Book uploaded successfully');
        } catch (error) {
          logger.error(error);
        }
      })
    );
  }
};

export const LibraryHeader = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const [success, setSuccess] = useState(false);

  return (
    <>
      <View style={styles.headerContainer}>
        <HeadingLarge>Library</HeadingLarge>
        <Pressable
          onPress={() => handleBookUpload(setSuccess)}
          style={({ pressed }) => [styles.iconContainer, pressed && { opacity: 0.5 }]}
        >
          <Feather name="share" size={20} color={theme.colors.background} />
        </Pressable>
      </View>
      <BookAlert visible={success} onClose={() => setSuccess(false)} />
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
