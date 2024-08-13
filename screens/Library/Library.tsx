import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { LibraryHeader } from './LibraryHeader';
import { Tab } from './Tab';
import { CurrentReading } from './CurrentReading';
import { ReadingGoals } from './ReadingGoal';
import { FinishedBooks } from './FinishedBooks';
import { Theme, useTheme, utilities } from '../../styles';
import { fetchBooks } from '../../store/database';
import { UploadedBook } from '../../store/database/types';
import { logger } from '../../utils';

const tabTitles = ['Current Reads', 'Reading Goals', 'Finished Books'];
const Components = [CurrentReading, ReadingGoals, FinishedBooks];

export const Library = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const [books, setBooks] = useState<UploadedBook[]>([]);

  const handleTabPress = (index: number) => {
    setActiveTab(index);
  };

  useEffect(() => {
    (async () => {
      try {
        const uploadedBooks = await fetchBooks();
        setBooks(uploadedBooks);
      } catch (error) {
        logger.error(error);
      }
    })();
  }, [books, activeTab]);

  const renderItem = () => {
    const SelectedTab = Components[activeTab];
    return (
      <View style={[utilities.mt_3]}>
        <SelectedTab books={books} />
      </View>
    );
  };

  return (
    <FlatList
      ListHeaderComponent={
        <View style={utilities.gap_1}>
          <LibraryHeader />
          <View>
            <View style={styles.line} />
            <Tab titles={tabTitles} activeTab={activeTab} onPress={handleTabPress} />
          </View>
        </View>
      }
      data={[{ key: 'content' }]}
      renderItem={renderItem}
      keyExtractor={(item) => item.key}
      contentContainerStyle={styles.container}
    />
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      backgroundColor: theme.colors.background
    },
    line: {
      height: 1,
      top: 10,
      backgroundColor: theme.colors.border
    },
    heading: {
      fontWeight: '700'
    }
  });
