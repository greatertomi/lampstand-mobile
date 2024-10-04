import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Toast from 'react-native-root-toast';
import { LibraryHeader } from './LibraryHeader';
import { Tab } from './Tab';
import { Theme, useTheme, utilities } from '../../styles';
import { UploadedBook } from '../../store/database/types';
import { logger } from '../../utils';
import { DuplicateBookModal } from './DuplicateBookModal';
import { handleBookUpload } from './utils';
import { fetchBooks, replaceBook } from '../../store';
import { useTabConfig } from './useTabConfig';

const DEFAULT_TOAST_DURATION = 3000;

export const Library = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const [books, setBooks] = useState<UploadedBook[]>([]);
  const [existingBook, setExistingBook] = useState<UploadedBook | null>(null);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const hasFinishedBooks = books.some((book) => book.progress === 100);
  const { tabTitles, Components } = useTabConfig(hasFinishedBooks);

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

  const handleExistingBook = (book: UploadedBook) => {
    setExistingBook(book);
    setIsDuplicate(true);
  };

  const handleUploadSuccess = () => {
    setIsUploadSuccess(true);
    setTimeout(() => setIsUploadSuccess(false), DEFAULT_TOAST_DURATION);
  };

  const SelectedTab = useMemo(() => Components[activeTab], [activeTab, Components]);

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View style={[utilities.gap_1, utilities.mt_2]}>
            <LibraryHeader
              activeTab={activeTab}
              hasFinishedBooks={hasFinishedBooks}
              onPress={() =>
                handleBookUpload({ onExistingBookFound: handleExistingBook, onUploadSuccess: handleUploadSuccess })
              }
            />
            <View>
              <View style={styles.line} />
              <Tab titles={tabTitles} activeTab={activeTab} onPress={(index) => setActiveTab(index)} />
              <View style={[utilities.mt_3]}>
                <SelectedTab
                  books={books}
                  onPress={() =>
                    handleBookUpload({ onExistingBookFound: handleExistingBook, onUploadSuccess: handleUploadSuccess })
                  }
                />
              </View>
            </View>
          </View>
        }
        data={[{ key: 'content' }]}
        keyExtractor={(item) => item.key}
        renderItem={() => null}
        contentContainerStyle={styles.flatListContainer}
      />
      <Toast textColor={theme.colors.text} visible={isUploadSuccess} backgroundColor={theme.colors.background}>
        Book added!
      </Toast>
      {isDuplicate && (
        <DuplicateBookModal
          onDiscard={() => {
            setIsDuplicate(false);
            logger.info('Discard');
          }}
          onReplace={async () => {
            if (existingBook) {
              await replaceBook(existingBook);
              setIsDuplicate(false);
              setIsUploadSuccess(true);
              setTimeout(() => setIsUploadSuccess(false), DEFAULT_TOAST_DURATION);
            }
          }}
          bookTitle={existingBook?.title}
        />
      )}
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: theme.colors.background
    },
    flatListContainer: {
      paddingHorizontal: 16
    },
    line: {
      height: 1,
      top: 10,
      backgroundColor: theme.colors.border
    }
  });
