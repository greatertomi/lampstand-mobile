import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BodyText, HeadingSmall, PressableItem } from '../../../../components';
import { Bookmark, useReader } from '../../../../package/epub-reader';
import { getBookState } from '../../../../store';
import { Theme, useTheme } from '../../../../styles';
import { logger } from '../../../../utils';

import { BookmarkItem } from './BookmarkItem';

export const Bookmarks = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const utils = theme.utilities;
  const navigation = useNavigation();
  const { meta } = useReader();
  const [savedBookmarks, setSavedBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const savedState = await getBookState(meta.title, meta.author);
        setSavedBookmarks(savedState?.bookmarks);
      } catch (error) {
        logger.error('Error fetching saved state:', error);
      }
    })();
  }, [meta.author, meta.title]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <PressableItem onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={theme.colors.text} />
        </PressableItem>
        <View style={utils.flex}>
          <HeadingSmall bold style={utils.ml_3}>
            Bookmarks
          </HeadingSmall>
        </View>
      </View>
      <View style={[styles.sort, utils.flex_dir_row, utils.gap_1, utils.align_items_center]}>
        <MaterialIcons name="tune" size={24} color={theme.colors.text} />
        <BodyText>Date Added (Newest)</BodyText>
      </View>
      {savedBookmarks.map((bookmark) => (
        <BookmarkItem
          key={bookmark.id}
          label={bookmark?.chapter?.label.trim()}
          createdAt={bookmark?.createdAt}
          cfi={bookmark?.location?.start?.cfi}
        />
      ))}
    </View>
  );
};

const createStyleSheet = (theme: Theme) => {
  const borderBottom = {
    borderBottomColor: theme.colors.secondaryText,
    borderBottomWidth: 0.2,
    paddingVertical: 16
  };

  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
      backgroundColor: theme.colors.background
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 32,
      ...borderBottom
    },
    sort: {
      ...borderBottom
    }
  });
};
