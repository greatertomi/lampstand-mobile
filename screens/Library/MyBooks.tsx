import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LibrarySection } from './LibrarySection';
import { CurrentBook, HeadingSmall } from '../../components';
import { UploadedBook } from '../../store/database/types';
import { Theme, useTheme } from '../../styles';
import { Welcome } from '../Welcome';
import { NotLoggedIn } from '../NotLoggedIn';
import { useAuthState } from '../../store';

type booksProps = {
  books: UploadedBook[];
  onPress: () => void;
};

const userCurrentBook = false;

export const MyBooks = ({ books, onPress }: booksProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const { isAuthenticated } = useAuthState();

  if (!isAuthenticated && books.length === 0) {
    return (
      <View>
        <Welcome onPress={onPress} />
        <NotLoggedIn />
      </View>
    );
  }

  if (books.length === 0) {
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

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      gap: 16,
      marginBottom: 8
    },
    currentReadContainer: {
      gap: 16,
      marginBottom: 30
    },
    nullUser: {
      height: 185,
      marginTop: 40,
      padding: 20,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8
    }
  });
