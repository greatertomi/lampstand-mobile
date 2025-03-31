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
  const { highlightText } = useReader();
  const [selectCfiRange, setSelectedCfiRange] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const savedState = await getBookState(bookId);
        setSavedBookState({ ...savedState, theme: mode } as TrackedState);
      } catch (error) {
        logger.error('Error fetching saved state:', error);
      }
    })();
  }, [bookId, mode]);

  const handleOnStarted = async () => {
    if (isAuthenticated) addStartTime(new Date().toISOString(), bookId);
  };

  const handleOnStateUpdated = async (readerState: TrackedState) => {
    await debouncedAddBookState(bookId, readerState);
  };

  const isExtendedSelection = (prevCfi: string, newCfi: string): boolean => {
    const extractOffsets = (cfi: string) => {
      const matches = cfi.match(/\/(\d+):(\d+)/g);
      return matches ? matches.map((m) => m.split(':').map(Number)) : [];
    };

    const prevOffsets = extractOffsets(prevCfi);
    const newOffsets = extractOffsets(newCfi);

    if (!prevOffsets.length || !newOffsets.length) return false;

    const prevStart = prevOffsets[0][1];
    const prevEnd = prevOffsets[prevOffsets.length - 1][1];

    const newStart = newOffsets[0][1];
    const newEnd = newOffsets[newOffsets.length - 1][1];

    return newStart === prevStart && newEnd > prevEnd;
  };

  const menuItems = [
    {
      key: 'copy',
      label: 'Copy',
      action: (cfiRange: string, text: string) => {
        console.log('copy', cfiRange, text);
        return false;
      }
    },
    {
      key: 'share',
      label: 'Share',
      action: (cfiRange: string, text: string) => {
        console.log('share', cfiRange, text);
        return false;
      }
    },
    {
      key: 'highlight',
      label: '🟡',
      action: (cfiRange: string, text: string) => {
        const highlightedText: Highlight = {
          cfiRange,
          colour: '#044252'
        };

        if (cfiRange !== selectCfiRange) {
          setSelectedCfiRange(cfiRange);
          highlightText(highlightedText);
        }

        if (selectCfiRange && isExtendedSelection(selectCfiRange, cfiRange)) {
          console.log('Selection extended!');
        }
        return false;
      }
    },
    {
      key: 'comment',
      label: 'Comment',
      action: (cfiRange: string, text: string) => {
        console.log('comment', cfiRange, text);
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
