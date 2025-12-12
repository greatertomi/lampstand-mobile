import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Platform, StyleSheet, View } from 'react-native';
import useSWRMutation from 'swr/mutation';

import { apiService, endpoints, parseHttpError } from '../../api';
import { useBooks } from '../../context';
import { useBookImporter, useSyncBooksWithBackend } from '../../hooks';
import { ScreenNavigation } from '../../routes';
import { replaceBook, UploadedBook, useAuthState, useReadTimeState, useToastState } from '../../store';
import { Theme, useTheme, utilities } from '../../styles';
import { logger, convertRelativeToAbsolute } from '../../utils';
import { handleBookUpload } from '../../utils/handle-book-upload';
import { hasFinishedBook } from '../../utils/hasFinishedBook';

import { DuplicateBookModal } from './DuplicateBookModal';
import { FadeHeader } from './FadeHeader';
import { LibraryHeader } from './LibraryHeader';
import { Tab } from './Tab';
import { ReadingLogLocation } from './types';
import UnsupportedBookModal from './UnsupportedBookModal';
import { useTabConfig } from './useTabConfig';

type ReadingLogType = {
  bookId: string;
  startTime: string;
  endTime: string;
  startLocation: ReadingLogLocation | null;
  endLocation: ReadingLogLocation | null;
};

export const Library = () => {
  const { isAuthenticated } = useAuthState();
  const { books } = useBooks();
  const [activeTab, setActiveTab] = useState(0);
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const [existingBook, setExistingBook] = useState<UploadedBook | null>(null);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isUnsupportedFormat, setIsUnsupportedFormat] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<ScreenNavigation<'MyBooks'>>();
  const [pendingBookToOpen, setPendingBookToOpen] = useState<UploadedBook | null>(null);

  const hasFinishedBooks = books.some((book) =>
    hasFinishedBook(book?.state?.currentLocation?.end?.percentage, book.isFinished)
  );
  const tabConfig = useTabConfig(hasFinishedBooks);
  const tabTitles = tabConfig.map((tab) => tab.title);
  const Components = tabConfig.map((tab) => tab.Component);
  const { setToastMessage } = useToastState();
  const { readingTime, resetReadingTime } = useReadTimeState();
  useSyncBooksWithBackend(books);

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
    if (
      !readingTime.bookId ||
      !readingTime.startTime ||
      !readingTime.endTime ||
      !readingTime.startLocation ||
      !readingTime.endLocation
    ) {
      return;
    }

    (async () => {
      try {
        await sendReadingLog({
          bookId: readingTime.bookId,
          startTime: readingTime.startTime,
          endTime: readingTime.endTime,
          startLocation: readingTime.startLocation,
          endLocation: readingTime.endLocation
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

  const handleBookImported = (book: UploadedBook) => {
    setPendingBookToOpen(book);
  };

  useEffect(() => {
    if (pendingBookToOpen && navigation) {
      const openBook = async () => {
        try {
          const absolutePath = await convertRelativeToAbsolute(pendingBookToOpen.filePath);

          if (absolutePath) {
            navigation.navigate('Reader', {
              bookPath: absolutePath,
              bookId: pendingBookToOpen.id,
              bookTitle: pendingBookToOpen.title
            });

            setPendingBookToOpen(null);
          } else {
            logger.error('Failed to convert relative path to absolute path for imported book');
            setToastMessage('Failed to open imported book');
            setPendingBookToOpen(null);
          }
        } catch (error) {
          logger.error('Error opening imported book:', error);
          setToastMessage('Error opening imported book');
          setPendingBookToOpen(null);
        }
      };

      openBook();
    }
  }, [pendingBookToOpen, navigation, setToastMessage]);

  useBookImporter({
    onExistingBookFound: handleExistingBook,
    closeModalForEpub: () => {
      setIsUnsupportedFormat(false);
    },
    onUploadSuccess: (book: FormData) => {
      setToastMessage('Book added!');
      if (isAuthenticated) loggedInUserBookUpload(book);
    },
    onUnsupportedFormat: () => {
      setIsUnsupportedFormat(true);
    },
    onBookImported: handleBookImported
  });

  const uploadBook = async () => {
    await handleBookUpload({
      onExistingBookFound: handleExistingBook,
      closeModalForEpub: () => {
        setIsUnsupportedFormat(false);
      },
      onUploadSuccess: (book: FormData) => {
        setToastMessage('Book added!');
        if (isAuthenticated) loggedInUserBookUpload(book);
      },
      onUnsupportedFormat: () => {
        setIsUnsupportedFormat(true);
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
      {Platform.OS === 'ios' && <FadeHeader title={tabTitles[activeTab]} scrollY={scrollY} />}
      <Animated.FlatList
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        ListHeaderComponent={
          <View style={styles.libraryContainer}>
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
      {isUnsupportedFormat && (
        <UnsupportedBookModal onPress={uploadBook} onClose={() => setIsUnsupportedFormat(false)} />
      )}
      {isDuplicate && (
        <DuplicateBookModal
          onDiscard={() => {
            setIsDuplicate(false);
            logger.info('Discard');
          }}
          onReplace={async () => {
            if (existingBook) {
              replaceBook(existingBook);
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
    },
    libraryContainer: {
      gap: 8,
      marginTop: Platform.select({ ios: 16, android: 0 })
    }
  });
