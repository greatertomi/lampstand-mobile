import React from 'react';
import { StyleSheet, View } from 'react-native';

import { UploadedBook } from '../../store';
import { Welcome } from '../Welcome';

import { LibrarySection } from './LibrarySection';

type booksProps = {
  books: UploadedBook[];
  onPress: () => void;
};

export const MyBooks = ({ books, onPress }: booksProps) => {
  const isAllBooksFinished = books.every((book) => book.isFinished === 1);
  const libraryBooks = books.filter((book) => book.isFinished !== 1);

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
