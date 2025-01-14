import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BodyText, BodyTextSmall, ThreeDots } from '../../../../components';
import { Theme, useTheme } from '../../../../styles';

interface BookmarkItemProps {
  bookmark: {
    id: string;
    chapter: string;
    time: string;
  };
}

export const BookmarkItem = ({ bookmark }: BookmarkItemProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <View style={styles.sort}>
      <View style={styles.row}>
        <View>
          <BodyText style={styles.bookmark}>{bookmark.chapter}</BodyText>
          <BodyTextSmall variant="secondary">{bookmark.time}</BodyTextSmall>
        </View>
        <ThreeDots vertical />
      </View>
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
