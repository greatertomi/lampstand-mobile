import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BodyText, PressableItem } from '../../../../components';
import { useBooks } from '../../../../context';
import { useReader } from '../../../../package/epub-reader';
import { RouteNavigation } from '../../../../routes';
import { deleteBookmark } from '../../../../store';
import { Theme, useTheme } from '../../../../styles';
import { EmptyTab } from '../Highlights/EmptyTab';
import { ReaderSettingsContainer } from '../ReaderSettingsContainer';

import { BookmarkItem } from './BookmarkItem';

export const Bookmarks = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const utils = theme.utilities;
  const { books } = useBooks();
  const route = useRoute<RouteNavigation<'Bookmarks'>>();
  const { bookId } = route.params;
  const [shouldShowSorting, setShouldShowSorting] = useState(false);
  const { removeBookmark, isBookmarked } = useReader();
  const { bookmarks: savedBookmarks } = books.find((book) => book.id === bookId)?.state || {};

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

  const handleDeleteBookmark = async (bookmarkId: string) => {
    await deleteBookmark(bookId, bookmarkId);

    if (isBookmarked) {
      removeBookmark();
    }
  };

  if (savedBookmarks?.length === 0) {
    return (
      <ReaderSettingsContainer title="Bookmarks">
        <EmptyTab
          label="No Bookmarks"
          desc="Tap the save icon of a page you want to book mark , that way you can save the page you desire."
        />
      </ReaderSettingsContainer>
    );
  }

  return (
    <ReaderSettingsContainer title="Bookmarks">
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
        {savedBookmarks?.map((bookmark) => (
          <BookmarkItem
            key={bookmark.id}
            label={bookmark?.chapter?.label.trim()}
            createdAt={bookmark?.createdAt}
            location={bookmark?.location}
            onDeleteBookmark={() => handleDeleteBookmark(bookmark.id)}
          />
        ))}
      </View>
    </ReaderSettingsContainer>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    sortingContainer: {
      position: 'relative',
      paddingHorizontal: 16
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
      borderBottomColor: theme.colors.secondaryText,
      borderBottomWidth: 0.2,
      paddingVertical: 16
    }
  });
