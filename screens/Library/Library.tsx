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
import { BookToast } from './BookToast';
import { DuplicateBookModal } from './DuplicateBookModal';
import { handleBookUpload } from './utils';

const tabTitles = ['Current Reads', 'Reading Goals', 'Finished Books'];
const Components = [CurrentReading, ReadingGoals, FinishedBooks];

// TODO: Create a notification system for this
const isUploadSuccess = false;
const isUploadDuplicate = false;
const uploadedBook = null;

export const Library = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const [books, setBooks] = useState<UploadedBook[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const uploadedBooks = await fetchBooks();
        setBooks(uploadedBooks);
      } catch (error) {
        logger.error(error);
      }
    })();
  }, [books]);

  const SelectedTab = Components[activeTab];

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View style={utilities.gap_1}>
            <LibraryHeader onPress={handleBookUpload} />
            <View>
              <View style={styles.line} />
              <Tab titles={tabTitles} activeTab={activeTab} onPress={(index) => setActiveTab(index)} />
              <View style={[utilities.mt_3]}>
                <SelectedTab books={books} />
              </View>
            </View>
          </View>
        }
        data={[{ key: 'content' }]}
        keyExtractor={(item) => item.key}
        renderItem={() => null}
        contentContainerStyle={styles.flatListContainer}
      />
      {isUploadSuccess && (
        <View style={styles.toast}>
          <BookToast />
        </View>
      )}
      <DuplicateBookModal book={uploadedBook} isUploadDuplicate={isUploadDuplicate} />
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1
    },
    flatListContainer: {
      paddingHorizontal: 16,
      backgroundColor: theme.colors.background
    },
    line: {
      height: 1,
      top: 10,
      backgroundColor: theme.colors.border
    },
    toast: {
      position: 'absolute',
      bottom: 0,
      padding: 12
    }
  });
