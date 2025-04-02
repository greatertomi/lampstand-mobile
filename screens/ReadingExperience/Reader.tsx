import { useRoute } from '@react-navigation/native';
import capitalize from 'lodash/capitalize';
import debounce from 'lodash/debounce';
import React, { useEffect, useState } from 'react';

import { EpubReader, Highlight, TrackedState, useReader } from '../../package/epub-reader';
import { RouteNavigation } from '../../routes';
import { addBookState, getBookState, useAuthState, useReadTimeState } from '../../store';
import { useTheme } from '../../styles';
import { logger } from '../../utils';
import { trimTitle } from '../../utils/trimBookTitle';

import { ReaderWrapper } from './ReaderWrapper';

const BOOK_STATE_DEBOUNCE_DELAY = 2000;

const debouncedAddBookState = debounce(async (id: string, state: TrackedState) => {
  await addBookState(id, state);
}, BOOK_STATE_DEBOUNCE_DELAY);

export const Reader = () => {
  const [savedBookState, setSavedBookState] = useState<TrackedState>();
  const route = useRoute<RouteNavigation<'Reader'>>();
  const { bookPath, bookId, bookTitle: initialTitle } = route.params;
  const { isAuthenticated } = useAuthState();
  const { addStartTime } = useReadTimeState();
  const { mode, theme } = useTheme();
  const { addHighlight, resetPreset  } = useReader();

  useEffect(() => {
    (async () => {
      try {
        const savedState = await getBookState(bookId);
        setSavedBookState({ ...savedState, theme: mode } as TrackedState);
        resetPreset();
      } catch (error) {
        logger.error('Error fetching saved state:', error);
      }
    })();
  }, [bookId, mode, resetPreset]);

  const checkForExistingHighlight = (cfiRange: string) =>
    savedBookState?.highlights?.some((highlight) => highlight.cfiRange === cfiRange);

  const handleOnStarted = async () => {
    if (isAuthenticated) addStartTime(new Date().toISOString(), bookId);
  };

  const handleOnStateUpdated = async (readerState: TrackedState) => {
    await debouncedAddBookState(bookId, readerState);
  };

  const handleSelectedHighlight = (cfiRange: string, text: string, color: string) => {
    const highlightedText: Highlight = {
      id: Date.now(),
      cfiRange,
      text,
      colour: color
    };

    const isExist = checkForExistingHighlight(cfiRange);

    if (isExist) return;
    addHighlight(highlightedText);
  };

  const menuItems = [
    {
      key: 'blue-highlight',
      label: '🔵',
      action: (cfiRange: string, text: string) => {
        handleSelectedHighlight(cfiRange, text, theme.colors.highlightBlue);
        return false;
      }
    },
    {
      key: 'red-highlight',
      label: '🔴',
      action: (cfiRange: string, text: string) => {
        handleSelectedHighlight(cfiRange, text, theme.colors.highlightRed);
        return false;
      }
    },
    {
      key: 'yellow-highlight',
      label: '🟡',
      action: (cfiRange: string, text: string) => {
        handleSelectedHighlight(cfiRange, text, theme.colors.highlightYellow);
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
        onStateUpdated={handleOnStateUpdated}
        initialState={savedBookState}
        initialLocation={savedBookState?.currentLocation?.start.cfi}
        onStarted={handleOnStarted}
        theme={theme}
      />
    </ReaderWrapper>
  );
};
