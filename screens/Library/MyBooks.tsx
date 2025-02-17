import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useBooks } from '../../context';
import { useSyncBooksWithBackend } from '../../hooks';
import { RootStackParamList } from '../../routes';
import { UploadedBook, useToastState } from '../../store';
import { Welcome } from '../Welcome';

import { LibrarySection } from './LibrarySection';

type booksProps = {
  onPress: () => void;
};


export const MyBooks = ({ onPress }: booksProps) => {
  const { books } = useBooks();

export const MyBooks = ({onPress }: booksProps) => {
  const route = useRoute<RouteProp<RootStackParamList, 'MyBooks'>>();
  const { setToastMessage } = useToastState();
  const isAllBooksFinished = books.every((book: UploadedBook) => book.isFinished === 1);
  const libraryBooks = books.filter((book: UploadedBook) => book.isFinished !== 1);
  const isFromLogin = route.params?.fromLogin || false;

  const { isComplete } = useSyncBooksWithBackend(books, isFromLogin);
  if (isComplete) setToastMessage('Books synced successfully');

  if (books.length === 0 || isAllBooksFinished) {
    return <Welcome onPress={onPress} isAllBooksFinished={isAllBooksFinished} />;
  }

  return (
    <View style={styles.container}>
      <LibrarySection label="My Books" books={libraryBooks} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    marginBottom: 8
  }
});
