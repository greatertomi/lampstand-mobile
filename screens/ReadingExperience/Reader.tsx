import { useRoute } from '@react-navigation/native';
import capitalize from 'lodash/capitalize';
import debounce from 'lodash/debounce';
import React, { useEffect, useState } from 'react';

import { EpubReader, Highlight, BookTrackedState, useReader, ReaderTrackedState } from '../../package/epub-reader';
import { RouteNavigation } from '../../routes';
import { addBookState, getBookState, useAuthState, useReadTimeState } from '../../store';
import { useTheme } from '../../styles';
import { getLocalStorageItem, logger, setLocalStorageItem } from '../../utils';
import { trimTitle } from '../../utils/trimBookTitle';

import { ReaderWrapper } from './ReaderWrapper';

const BOOK_STATE_DEBOUNCE_DELAY = 2000;

const debouncedAddBookState = debounce(async (id: string, state: BookTrackedState) => {
  await addBookState(id, state);
}, BOOK_STATE_DEBOUNCE_DELAY);

export const Reader = () => {
  const [savedBookState, setSavedBookState] = useState<BookTrackedState>();
  const [savedReaderState, setSavedReaderState] = useState<ReaderTrackedState>();
  const route = useRoute<RouteNavigation<'Reader'>>();
  const { bookPath, bookId, bookTitle: initialTitle } = route.params;
  const { isAuthenticated } = useAuthState();
  const { addStartTime } = useReadTimeState();
  const { mode, theme } = useTheme();
  const { addHighlight } = useReader();

  useEffect(() => {
    (async () => {
      try {
        const savedState = await getBookState(bookId);
        setSavedBookState(savedState as BookTrackedState);
        const getReaderState = JSON.parse(await getLocalStorageItem('readerState'));
        const readerStateWithTheme = {
          ...getReaderState,
          theme: mode
        };
        setSavedReaderState(readerStateWithTheme as ReaderTrackedState);
      } catch (error) {
        logger.error('Error fetching saved state:', error);
      }
    })();
  }, [bookId, mode]);

  const checkForExistingHighlight = (cfiRange: string) =>
    savedBookState?.highlights?.some((highlight) => highlight.cfiRange === cfiRange);

  const handleOnStarted = async () => {
    if (isAuthenticated) addStartTime(new Date().toISOString(), bookId);
  };

  const handleOnBookStateUpdated = async (bookState: BookTrackedState) => {
    await debouncedAddBookState(bookId, bookState);
  };

  const handleOnReaderStateUpdated = async (readerState: ReaderTrackedState) => {
    await setLocalStorageItem('readerState', JSON.stringify({ ...readerState, theme: mode }));
    setSavedReaderState(readerState);
  };

  const handleSelectedHighlight = (cfiRange: string, text: string, color: string) => {
    const highlightedText: Highlight = {
      id: Date.now(),
      cfiRange,
      text,
      colour: color,
      createdAt: Date.now()
    };

    const isExist = checkForExistingHighlight(cfiRange);

    if (isExist) return;
    addHighlight(highlightedText);
  };

  const menuItems = [
    {
      key: 'lime-green',
      label: '🟢',
      action: (cfiRange: string, text: string) => {
        handleSelectedHighlight(cfiRange, text, theme.colors.highlightGoogleGreen);
        return false;
      }
    },
    {
      key: 'red-highlight',
      label: '🟡',
      action: (cfiRange: string, text: string) => {
        handleSelectedHighlight(cfiRange, text, theme.colors.highlightSunFlower);
        return false;
      }
    },
    {
      key: 'yellow-highlight',
      label: '🟣',
      action: (cfiRange: string, text: string) => {
        handleSelectedHighlight(cfiRange, text, theme.colors.highlightVividViolet);
        return false;
      }
    },
    {
      key: 'share',
      label: 'Share',
      action: (cfiRange: string, text: string) => {
        logger.info('share', cfiRange, text);
        return false;
      }
    },
    {
      key: 'comment',
      label: 'Comment',
      action: (cfiRange: string, text: string) => {
        logger.info('comment', cfiRange, text);
        return false;
      }
    }
  ];

  return (
    <ReaderWrapper bookTitle={capitalize(trimTitle(initialTitle || ''))} bookId={bookId}>
      <EpubReader
        src={bookPath}
        manager="continuous"
        flow="scrolled"
        menuItems={menuItems}
        onBookStateUpdated={handleOnBookStateUpdated}
        onReaderStateUpdated={handleOnReaderStateUpdated}
        bookState={savedBookState}
        readerState={savedReaderState}
        onStarted={handleOnStarted}
        theme={theme}
      />
    </ReaderWrapper>
  );
};
