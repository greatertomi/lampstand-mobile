import { useRoute } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import useSWRMutation from 'swr/mutation';

import { apiService, endpoints, parseHttpError } from '../../api';
import { useBooks } from '../../context';
import { useSyncBooksWithBackend } from '../../hooks';
import { RouteNavigation } from '../../routes';
import { replaceBook, UploadedBook, useAuthState, useReadTimeState, useToastState } from '../../store';
import { Theme, useTheme, utilities } from '../../styles';
import { logger } from '../../utils';
import { hasFinishedBook } from '../../utils/hasFinishedBook';

import { DuplicateBookModal } from './DuplicateBookModal';
import { LibraryHeader } from './LibraryHeader';
import { Tab } from './Tab';
import { useTabConfig } from './useTabConfig';
import { handleBookUpload } from './utils';

type ReadingLogType = Record<'endTime' | 'startTime' | 'bookId', string>;

export const Library = () => {
  const { isAuthenticated } = useAuthState();
  const { books } = useBooks();
  const [activeTab, setActiveTab] = useState(0);
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const [existingBook, setExistingBook] = useState<UploadedBook | null>(null);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const hasFinishedBooks = books.some((book) =>
    hasFinishedBook(book?.state?.currentLocation?.end?.percentage, book.isFinished)
  );
  const tabConfig = useTabConfig(hasFinishedBooks);
  const tabTitles = tabConfig.map((tab) => tab.title);
  const Components = tabConfig.map((tab) => tab.Component);
  const { setToastMessage } = useToastState();
  const { readingTime, resetReadingTime } = useReadTimeState();
  const route = useRoute<RouteNavigation<'MyBooks'>>();

  const isFromLogin = route.params?.fromAuth || false;
  useSyncBooksWithBackend(books, isFromLogin);

  const { trigger: sendReadingLog } = useSWRMutation(
    endpoints.createReadingLog,
    async (url, { arg }: { arg: ReadingLogType }) => {
      const response = await apiService.post(url, arg);
      return response.data.message;
    }
  );

  const { trigger: loggedInUserBookUpload } = useSWRMutation(
    endpoints.saveBookBackend,
    async (url, { arg }: { arg: FormData }) => {
      const response = await apiService.post(url, arg);
      return response.data;
    }
  );

  useMemo(() => {
    if (!readingTime.bookId || !readingTime.startTime || !readingTime.endTime) return;

    (async () => {
      try {
        await sendReadingLog({
          bookId: readingTime.bookId,
          startTime: readingTime.startTime,
          endTime: readingTime.endTime
        });

        resetReadingTime();
      } catch (error) {
        logger.error('Failed to send reading log:', parseHttpError(error).message);
      }
    })();
  }, [readingTime, resetReadingTime, sendReadingLog]);

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

  const SelectedTab = useMemo(() => {
    if (activeTab >= Components.length) {
      setActiveTab(0);
    }
    return Components[activeTab];
  }, [activeTab, Components]);

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View style={[utilities.gap_1, utilities.mt_2]}>
            <LibraryHeader activeTab={activeTab} hasFinishedBooks={hasFinishedBooks} onPress={uploadBook} />
            <View>
              <View style={styles.line} />
              <Tab titles={tabTitles} activeTab={activeTab} onPress={(index) => setActiveTab(index)} />
              <View style={[utilities.mt_3]}>{SelectedTab && <SelectedTab onPress={uploadBook} />}</View>
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
