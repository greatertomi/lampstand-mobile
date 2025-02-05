import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BodyText, BodyTextSmall, HeadingSmall, PressableItem } from '../../components';
import { BookCover } from '../../components/Book/BookCover';
import { UploadedBook } from '../../store';
import { Theme, useTheme } from '../../styles';
import { formatBookTitle } from '../../utils';

type FinishedBookProps = Pick<UploadedBook, 'cover' | 'title' | 'author'>;
export const FinishedBook = ({ cover, title, author }: FinishedBookProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);

  return (
    <PressableItem style={styles.container}>
      <View style={styles.bookCover}>
        <BookCover cover={cover} />
      </View>
      <View style={[utils.flex, utils.justify_content_center, utils.gap_1]}>
        <HeadingSmall bold>{formatBookTitle(title)}</HeadingSmall>
        <BodyText>{author}</BodyText>
        <View style={styles.button}>
          <BodyTextSmall style={styles.finished}>Finished</BodyTextSmall>
        </View>
      </View>
    </PressableItem>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: 12,
      alignItems: 'center',
      height: 170
    },
    bookCover: {
      width: 120
    },

    button: {
      backgroundColor: theme.colors.success,
      width: 70,
      borderRadius: 10,
      paddingVertical: 6,
      paddingHorizontal: 10
    },
    finished: {
      textAlign: 'center',
      color: theme.colors.background
    }
  });
