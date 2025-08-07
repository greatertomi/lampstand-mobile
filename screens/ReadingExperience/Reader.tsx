import { useNavigation, useRoute } from '@react-navigation/native';
import capitalize from 'lodash/capitalize';
import debounce from 'lodash/debounce';
import React, { useEffect, useMemo, useState } from 'react';

import { useBooks } from '../../context';
import { EpubReader, useReader } from '../../package/epub-reader';
import { BookTrackedState, ReaderTrackedState, Highlight, ReaderContextMenuItem, Note } from '../../package/types';
import { RouteNavigation, ScreenNavigation } from '../../routes';
import { addBookState, useAuthState, useReadTimeState } from '../../store';
import { useTheme } from '../../styles';
import { getLocalStorageItem, logger, setLocalStorageItem } from '../../utils';
import { trimTitle, isHighlightMatch } from '../../utils/helperFunctions';

import { createContextMenuItems } from './contextMenuItems';
import { ReaderWrapper } from './ReaderWrapper';

const BOOK_STATE_DEBOUNCE_DELAY = 1000;

const debouncedAddBookState = debounce(async (id: string, state: BookTrackedState) => {
  addBookState(id, state);
}, BOOK_STATE_DEBOUNCE_DELAY);

export const Reader = () => {
  const { books } = useBooks();
  const [savedReaderState, setSavedReaderState] = useState<ReaderTrackedState>();
  const route = useRoute<RouteNavigation<'Reader'>>();
  const { addHighlight, removeHighlight, addNote, totalLocations } = useReader();
  const { bookPath, bookId, bookTitle: initialTitle } = route.params;
  const { isAuthenticated } = useAuthState();
  const { addStartTime, resetReadingTime } = useReadTimeState();
  const { mode, theme } = useTheme();
  const [menuItemsToShow, setMenuItemsToShow] = useState<ReaderContextMenuItem[]>([]);
  const [isFocusedState, setIsFocusedState] = useState(false);

  const savedBookState = useMemo(() => {
    const book = books.find((b) => b.id === bookId);
    return (
      book?.state ?? {
        currentLocation: null,
        bookmarks: [],
        highlights: [],
        notes: []
      }
    );
  }, [books, bookId]);
  const navigation = useNavigation<ScreenNavigation<'InTextComment'>>();

  useEffect(() => {
    (async () => {
      try {
        const getReaderState = JSON.parse(await getLocalStorageItem('readerState'));
        const readerStateWithTheme = {
          ...getReaderState,
          theme: mode
        };
        setSavedReaderState(readerStateWithTheme);
      } catch (error) {
        logger.error('Error fetching saved state:', error);
      }
    })();
  }, [mode]);

  const doesHighlightExist = (cfiRange: string, text: string): boolean =>
    savedBookState?.highlights?.some((highlight) => isHighlightMatch(highlight, cfiRange, text)) ?? false;

  const handleOnReady = async () => {
    if (isAuthenticated) {
      resetReadingTime();

      const location = savedBookState.currentLocation;

      if (!location) {
        logger.warn('No current location found in book state');
        return;
      }

      const startLocation = {
        cfi: location.start.cfi,
        href: location.start.href,
        percentage: location.start.percentage,
        pages: {
          // Todo: totalLocations might not be accurate as the book might not have been fully loaded yet
          totalPages: totalLocations,
          currentPage: location.start.location
        }
      };

      addStartTime(new Date().toISOString(), bookId, startLocation);
    }
  };

  const handleOnBookStateUpdated = async (bookState: BookTrackedState) => {
    debouncedAddBookState(bookId, bookState);
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

    const isExist = doesHighlightExist(cfiRange, text);

    if (isExist) return;
    addHighlight(highlightedText);
  };

  const handleAddNote = (cfiRange: string, text: string) => {
    const note: Note = {
      id: String(Date.now()),
      cfiRange,
      text,
      createdAt: String(Date.now())
    };
    addNote(note, bookId);
    return false;
  };

  const { defaultMenuItems, highlightedMenuItems } = createContextMenuItems({
    theme,
    handleSelectedHighlight,
    removeHighlight,
    handleAddNote
  });

  const handleMenuItemSelection = (cfiRange: string, text: string) => {
    const hasHighlight = doesHighlightExist(cfiRange, text);
    if (hasHighlight) {
      setMenuItemsToShow(highlightedMenuItems);
    } else {
      setMenuItemsToShow(defaultMenuItems);
    }
  };

  return (
    <ReaderWrapper
      bookTitle={capitalize(trimTitle(initialTitle || ''))}
      bookId={bookId}
      isFocusedState={isFocusedState}
    >
      <EpubReader
        src={bookPath}
        manager="continuous"
        flow="scrolled"
        menuItems={menuItemsToShow}
        onBookStateUpdated={handleOnBookStateUpdated}
        onReaderStateUpdated={handleOnReaderStateUpdated}
        bookState={savedBookState}
        readerState={savedReaderState}
        onReady={handleOnReady}
        onAddNote={(note) => {
          navigation.navigate('InTextComment', { noteItem: note, bookId });
        }}
        onDoubleTap={() => setIsFocusedState((prev) => !prev)}
        theme={theme}
        onSelected={(selectedText, cfiRange) => handleMenuItemSelection(cfiRange, selectedText)}
      />
    </ReaderWrapper>
  );
};
