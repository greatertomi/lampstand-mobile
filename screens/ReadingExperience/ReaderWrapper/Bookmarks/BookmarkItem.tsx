import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BodyText, BodyTextSmall, ThreeDots } from '../../../../components';
import { Theme, useTheme } from '../../../../styles';
import { Bookmark } from '../../../../package/epub-reader';

export const BookmarkItem = ({ bookmarks }: { bookmarks: Bookmark[] }) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  console.log(bookmarks.map((bookmark) => bookmark?.chapter?.label));

  return (
    <View style={styles.sort}>
      {bookmarks.map((bookmark) => (
        <View style={styles.row}>
          <View>
            <BodyText style={styles.bookmark}>{bookmark?.chapter?.label}</BodyText>
            <BodyTextSmall variant="secondary">{bookmark?.createdAt}</BodyTextSmall>
          </View>
          <ThreeDots vertical />
        </View>
      ))}
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    sort: {
      borderBottomColor: theme.colors.secondaryText,
      borderBottomWidth: 0.2,
      paddingVertical: 16,
      position: 'relative'
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    bookmark: {
      marginBottom: 5
    }
  });
