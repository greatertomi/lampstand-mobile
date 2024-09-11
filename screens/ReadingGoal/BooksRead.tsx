import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { BodyText, BodyTextLarge, HeadingSmall } from '../../components';
import { Theme, useTheme } from '../../styles';
import { UploadedBook } from '../../store/database/types';

type BookReadProps = {
  heading: string;
  books: Pick<UploadedBook, 'title' | 'author' | 'image'>[];
};

export const BooksRead = ({ heading, books }: BookReadProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);

  return (
    <View style={[utils.justify_content_center, utils.align_items_center, utils.gap_3]}>
      <BodyTextLarge bold>{heading}</BodyTextLarge>
      <View style={[utils.flex_dir_row, utils.wrap, styles.booksContainer]}>
        {books.map((book, index) => (
          <View style={styles.innerContainer} key={index}>
            <Image style={styles.image} source={book.image} />
            <View>
              <HeadingSmall numberOfLines={1} ellipsizeMode="tail">
                {book.title}
              </HeadingSmall>
              <BodyText style={styles.author} numberOfLines={1} ellipsizeMode="tail">
                {book.author}
              </BodyText>
            </View>
          </View>
        ))}
      </View>
      <View style={utils.mb_1}>
        <BodyTextLarge bold>You’ve read {books.length} books</BodyTextLarge>
        <BodyText style={styles.keepReading}>Keep Reading</BodyText>
      </View>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    booksContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    },
    innerContainer: {
      width: '30%',
      alignItems: 'center',
      marginBottom: 16
    },
    image: {
      width: 75,
      height: 119,
      resizeMode: 'stretch',
      borderRadius: 5
    },
    author: {
      color: theme.colors.tertiaryText
    },
    keepReading: {
      textAlign: 'center',
      color: theme.colors.tertiaryText
    }
  });
