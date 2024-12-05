import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { BodyText, HeadingSmall, PressableItem } from '../../../../components';
import { Theme, useTheme } from '../../../../styles';

import { BookmarkItem } from './BookmarkItem';

const bookmarks = [
  {
    id: '1',
    chapter: 'Chapter 13 - Page 4',
    time: 'Added 2 minutes ago'
  },
  {
    id: '2',
    chapter: 'Chapter 14 - Page 16',
    time: 'Added 4 minutes ago'
  },
  {
    id: '3',
    chapter: 'Chapter 15 - Page 40',
    time: 'Added 6 minutes ago'
  }
];

export const Bookmarks = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const utils = theme.utilities;
  const navigation = useNavigation();

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
      <FlatList
        data={bookmarks}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => <BookmarkItem key={index} bookmark={item} />}
      />
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
    },
    bookmark: {
      marginBottom: 5
    },
    editDel: {
      width: 135,
      height: 121
    }
  });
};
