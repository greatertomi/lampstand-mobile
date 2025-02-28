import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useBooks } from '../../context';
import { UploadedBook } from '../../store';
import { Welcome } from '../Welcome';

import { LibrarySection } from './LibrarySection';
import { TabComponentProps } from './types';

export const MyBooks = ({ onPress }: TabComponentProps) => {
  const { books } = useBooks();
  const isAllBooksFinished = books.every((book: UploadedBook) => book.isFinished === 1);
  const libraryBooks = books.filter((book: UploadedBook) => book.isFinished !== 1);

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
