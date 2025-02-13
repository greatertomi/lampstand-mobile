import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import useSWRMutation from 'swr/mutation';

import { apiService, endpoints } from '../../api';
import { fetchBooks, replaceBook, UploadedBook, useAuthState, useToastState } from '../../store';
import { Theme, useTheme, utilities } from '../../styles';
import { logger } from '../../utils';
import { hasFinishedBook } from '../../utils/hasFinishedBook';

import { DuplicateBookModal } from './DuplicateBookModal';
import { LibraryHeader } from './LibraryHeader';
import { Tab } from './Tab';
import { useTabConfig } from './useTabConfig';
import { handleBookUpload } from './utils';

export const Library = () => {
  const { isAuthenticated } = useAuthState();
  const [activeTab, setActiveTab] = useState(0);
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const [books, setBooks] = useState<UploadedBook[]>([]);
  const [existingBook, setExistingBook] = useState<UploadedBook | null>(null);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const hasFinishedBooks = books.some((book) =>
    hasFinishedBook(book?.state?.currentLocation?.end?.percentage, book.progress)
  );
  const { tabTitles, Components } = useTabConfig(hasFinishedBooks);
  const { setToastMessage } = useToastState();
  const { trigger: loggedInUserBookUpload } = useSWRMutation(
    endpoints.saveBookBackend,
    async (url, { arg }: { arg: FormData }) => {
      const response = await apiService.post(url, arg);
      return response.data;
    }
  );

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

  const uploadBook = async () => {
    await handleBookUpload({
      onExistingBookFound: handleExistingBook,
      onUploadSuccess: (book: FormData) => {
        setToastMessage('Book added!');
        if (isAuthenticated) loggedInUserBookUpload(book);
      }
    });
  };

  const SelectedTab = useMemo(() => Components[activeTab], [activeTab, Components]);

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View style={[utilities.gap_1, utilities.mt_2]}>
            <LibraryHeader activeTab={activeTab} hasFinishedBooks={hasFinishedBooks} onPress={uploadBook} />
            <View>
              <View style={styles.line} />
              <Tab titles={tabTitles} activeTab={activeTab} onPress={(index) => setActiveTab(index)} />
              <View style={[utilities.mt_3]}>
                <SelectedTab books={books} onPress={uploadBook} />
              </View>
            </View>
          </View>
        }
        data={[{ key: 'content' }]}
        keyExtractor={(item) => item.key}
        renderItem={() => null}
        contentContainerStyle={styles.flatListContainer}
      />
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
              setToastMessage('Book Added!');
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
