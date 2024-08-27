import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { LibrarySection } from './LibrarySection';
import { BodyText, BodyTextSmall, CurrentBook, HeadingSmall, SecondaryButton } from '../../components';
import { UploadedBook } from '../../store/database/types';
import { uploadIcon } from '../../assets';
import { Theme, useTheme, utilities } from '../../styles';

type booksProps = {
  books: UploadedBook[];
  onPress: () => void;
};

const userCurrentBook = false;
const loggedInUser = false;

export const CurrentReading = ({ books, onPress }: booksProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  if (!loggedInUser && books.length === 0) {
    return (
      <View style={styles.nullUser}>
        <BodyText bold>Welcome to Lampstand!</BodyText>
        <BodyTextSmall>Let’s start by filling your bookshelf:</BodyTextSmall>
        <View style={[utilities.width_100, utilities.mt_1]}>
          <SecondaryButton
            title="Import your books"
            icon={<SvgXml xml={uploadIcon({ color: theme.colors.primary, size: 14 })} />}
            onPress={onPress}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loggedInUser && (
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
      )}
      {books.length > 0 && <LibrarySection label="My Books" books={books} />}
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
      paddingVertical: 30,
      paddingHorizontal: 19,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8
    }
  });
