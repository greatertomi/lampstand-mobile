import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LibrarySection } from './LibrarySection';
import { CurrentBook, HeadingSmall } from '../../components';
import { UploadedBook, useAuthState } from '../../store';
import { Welcome } from '../Welcome';

type booksProps = {
  books: UploadedBook[];
  onPress: () => void;
};

const userCurrentBook = false;

export const MyBooks = ({ books, onPress }: booksProps) => {
  const { isAuthenticated } = useAuthState();

  if (!isAuthenticated && books.length === 0) {
    return <Welcome onPress={onPress} />;
  }

  return (
    <View style={styles.container}>
      <>
        {userCurrentBook && (
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
