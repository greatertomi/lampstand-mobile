import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BodyText, BodyTextSmall, PressableItem, ThreeDots } from '../../../../components';
import { Bookmark, useReader } from '../../../../package/epub-reader';
import { Theme, useTheme } from '../../../../styles';

export const BookmarkItem = ({ bookmarks }: { bookmarks: Bookmark[] }) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const { goToLocation } = useReader();
  const navigation = useNavigation();

  return (
    <View style={styles.sort}>
      {bookmarks.map((bookmark, index) => (
        <PressableItem
          style={styles.row}
          key={index}
          onPress={() => {
            goToLocation(bookmark?.location?.start?.cfi);
            navigation.goBack();
          }}
        >
          <View>
            <BodyText style={styles.bookmark}>{bookmark?.chapter?.label}</BodyText>
            <BodyTextSmall variant="secondary">{bookmark?.createdAt}</BodyTextSmall>
          </View>
          <ThreeDots vertical />
        </PressableItem>
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
