import React from 'react';
import { StyleSheet, View } from 'react-native';

import { CurrentBook, HeadingSmall } from '../../components';
import { UploadedBook } from '../../store';
import { Welcome } from '../Welcome';

import { LibrarySection } from './LibrarySection';

type booksProps = {
  books: UploadedBook[];
  onPress: () => void;
};

const isUserCurrentBook = false;

export const MyBooks = ({ books, onPress }: booksProps) => {
  if (books.length === 0) {
    return <Welcome onPress={onPress} />;
  }

  return (
    <View style={styles.container}>
      <>
        {isUserCurrentBook && (
          <View style={styles.currentReadContainer}>
            <HeadingSmall bold>Currently Reading</HeadingSmall>
            <CurrentBook
              title="Testing Design"
              author="John Doe"
              image={require('../../assets/bookImages/bookOne.png')}
              categories={['Fiction', 'Science', 'Sport', 'Fiction', 'Science', 'Sport']}
              progress={0.7}
            />
          </View>
        )}
        <LibrarySection label="My Books" books={books} />
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    marginBottom: 8
  },
  currentReadContainer: {
    gap: 16,
    marginBottom: 30
  }
});
