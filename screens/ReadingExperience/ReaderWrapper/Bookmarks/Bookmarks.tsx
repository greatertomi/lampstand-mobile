import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BodyText, BodyTextLarge, BodyTextSmall, HeadingSmall, PressableItem } from '../../../../components';
import { Bookmark } from '../../../../package/epub-reader';
import { RouteNavigation } from '../../../../routes';
import { deleteBookmark, getBookState } from '../../../../store';
import { Theme, useTheme } from '../../../../styles';
import { logger } from '../../../../utils';

import { BookmarkItem } from './BookmarkItem';

export const Bookmarks = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const utils = theme.utilities;
  const navigation = useNavigation();
  const [savedBookmarks, setSavedBookmarks] = useState<Bookmark[] | undefined>([]);
  const route = useRoute<RouteNavigation<'Bookmarks'>>();
  const { bookId } = route.params;
  const [shouldShowSorting, setShouldShowSorting] = useState(false);

  const sortingLists = [
    {
      label: 'Date Added (Newest)',
      onPress: () => {}
    },
    {
      label: 'Date Added (Oldest)',
      onPress: () => {}
    },
    {
      label: 'Position in book (Beginning First)',
      onPress: () => {}
    },
    {
      label: 'Position in book (Ending First)',
      onPress: () => {}
    }
  ];

  useEffect(() => {
    (async () => {
      try {
        const savedState = await getBookState(bookId);
        setSavedBookmarks(savedState?.bookmarks || []);
      } catch (error) {
        logger.error('Error fetching saved state:', error);
      }
    })();
  }, [bookId]);

  const handleDeleteBookmark = async (bookmarkId: string) => {
    setSavedBookmarks((prev) => prev?.filter((bookmark) => bookmark.id !== bookmarkId));
    await deleteBookmark(bookId, bookmarkId);
  };

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
      {savedBookmarks && savedBookmarks.length > 0 ? (
        <View style={styles.sortingContainer}>
          <PressableItem
            style={[styles.sort, utils.flex_dir_row, utils.gap_1, utils.align_items_center]}
            onPress={() => setShouldShowSorting(!shouldShowSorting)}
          >
            <MaterialIcons name="tune" size={24} color={theme.colors.text} />
            <BodyText>Date Added (Newest)</BodyText>
          </PressableItem>
          {shouldShowSorting && (
            <View style={styles.sortingList}>
              {sortingLists.map((list, index) => (
                <PressableItem key={index}>
                  <BodyText>{list.label}</BodyText>
                </PressableItem>
              ))}
            </View>
          )}
          {savedBookmarks.map((bookmark) => (
            <BookmarkItem
              key={bookmark.id}
              label={bookmark?.chapter?.label.trim()}
              createdAt={bookmark?.createdAt}
              location={bookmark?.location}
              onDeleteBookmark={() => handleDeleteBookmark(bookmark.id)}
            />
          ))}
        </View>
      ) : (
        <View style={[utils.flex, utils.justify_content_center, utils.align_items_center, utils.mx_5, utils.gap_1]}>
          <BodyTextLarge bold variant="secondary">
            No Bookmarks
          </BodyTextLarge>
          <BodyTextSmall style={utils.text_center} bold variant="secondary">
            Tap the save icon of a page you want to book mark , that way you can save the page you desire.
          </BodyTextSmall>
        </View>
      )}
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
    sortingContainer: {
      position: 'relative'
    },
    sortingList: {
      position: 'absolute',
      backgroundColor: theme.colors.background,
      padding: 25,
      zIndex: 10,
      borderRadius: 10,
      top: 56,
      gap: 24
    },
    sort: {
      ...borderBottom
    }
  });
};
