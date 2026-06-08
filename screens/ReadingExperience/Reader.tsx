import { useNavigation, useRoute } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import capitalize from 'lodash/capitalize';
import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Share } from 'react-native';

import { ExpoStatusBar } from '../../components';
import { useBooks } from '../../context';
import { EpubReader, useReader } from '../../packages/epub-reader';
import { BookTrackedState, ReaderTrackedState, Highlight, Note } from '../../packages/types';
import { RouteNavigation, ScreenNavigation } from '../../routes';
import { addBookState, useAuthState, useReadTimeState } from '../../store';
import { useTheme } from '../../styles';
import { getLocalStorageItem, logger, setLocalStorageItem } from '../../utils';
import { trimTitle, isHighlightMatch } from '../../utils/helperFunctions';

import { ReaderWrapper } from './ReaderWrapper';
import { SelectionActions } from './ReaderWrapper/SelectionModal';

const BOOK_STATE_DEBOUNCE_DELAY = 300;

const debouncedAddBookState = debounce(async (id: string, state: BookTrackedState) => {
  addBookState(id, state);
}, BOOK_STATE_DEBOUNCE_DELAY);

export const Reader = () => {
  const { books } = useBooks();
  const [savedReaderState, setSavedReaderState] = useState<ReaderTrackedState>();
  const route = useRoute<RouteNavigation<'Reader'>>();
  const { addHighlight, removeHighlight, totalLocations } = useReader();
  const { bookPath, bookId, bookTitle: initialTitle } = route.params;
  const { isAuthenticated } = useAuthState();
  const { addStartTime, resetReadingTime } = useReadTimeState();
  const { mode, theme } = useTheme();
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  const [selection, setSelection] = useState<{ cfiRange: string; text: string; isHighlighted: boolean } | null>(null);
  const [isFocusedState, setIsFocusedState] = useState(false);
  const selectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasReaderRestoredRef = useRef(false);

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

  // Cleanup timeout on unmount
  useEffect(
    () => () => {
      if (selectionTimeoutRef.current) {
        clearTimeout(selectionTimeoutRef.current);
      }
    },
    []
  );

  const doesHighlightExist = useCallback(
    (cfiRange: string, text: string): boolean =>
      savedBookState?.highlights?.some((highlight) => isHighlightMatch(highlight, cfiRange, text)) ?? false,
    [savedBookState?.highlights]
  );

  const handleOnReady = async () => {
    // onReady fires after View.tsx has dispatched goToLocation(...) to restore the
    // saved location — the jump is initiated (not awaited) before this callback runs.
    // That ordering means any later book-state updates reflect the restore in flight,
    // so it's now safe to begin persisting. Set regardless of auth or whether a saved
    // location exists, otherwise new/signed-out readers would never save progress.
    hasReaderRestoredRef.current = true;

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
    // Don't persist until the saved location has been restored, otherwise the
    // initial render's start position overwrites the user's real progress when a
    // book is opened and closed immediately.
    if (!hasReaderRestoredRef.current) return;
    if (!bookState?.currentLocation) return;
    // The locations index isn't generated yet → page number and percentage are 0.
    // Saving now would wipe the displayed progress on the listing, so wait until ready.
    if (totalLocations <= 0) return;
    void debouncedAddBookState(bookId, bookState);
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
    const timestamp = Date.now();
    const note: Note = {
      id: `${timestamp}-${Math.random().toString(36).slice(2, 11)}`,
      cfiRange,
      text,
      createdAt: String(timestamp)
    };
    navigation.navigate('InTextComment', { noteItem: note, bookId });
    return false;
  };

  const handleCopyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    setIsSelectionModalOpen(false);
  };

  const handleShare = async (text: string) => {
    try {
      const book = books.find((b) => b.id === bookId);
      const title = book?.title || initialTitle;
      const author = book?.author || '';
      // eslint-disable-next-line sonarjs/no-nested-template-literals
      const content = `"${text}"\n— ${title}${author ? ` by ${author}` : ''}`;

      await Share.share(
        { message: content },
        {
          subject: 'Share quote from book',
          dialogTitle: 'Share quote from book'
        }
      );
    } catch (error) {
      logger.error('Error sharing text:', error);
    }
  };

  const handleOpenSelectionModal = useCallback(
    (cfiRange: string, text: string) => {
      if (!text.trim()) return;

      // Clear any existing timeout
      if (selectionTimeoutRef.current) {
        clearTimeout(selectionTimeoutRef.current);
      }

      // Debounce the modal opening to ensure selection is complete
      selectionTimeoutRef.current = setTimeout(() => {
        const isHighlighted = doesHighlightExist(cfiRange, text);
        setSelection({ cfiRange, text, isHighlighted });
        setIsSelectionModalOpen(true);
      }, 300); // 300ms delay to ensure selection is complete
    },
    [doesHighlightExist]
  );

  const closeSelectionModal = useCallback(() => {
    if (selectionTimeoutRef.current) {
      clearTimeout(selectionTimeoutRef.current);
      selectionTimeoutRef.current = null;
    }
    setIsSelectionModalOpen(false);
    setSelection(null);
  }, []);

  const actions: SelectionActions = {
    onAddHighlight: (color: string) => {
      if (!selection) return;
      handleSelectedHighlight(selection.cfiRange, selection.text, color);
      closeSelectionModal();
    },
    onRemoveHighlight: () => {
      if (!selection) return;
      removeHighlight(selection.cfiRange, selection.text);
      closeSelectionModal();
    },
    onAddNote: () => {
      if (!selection) return;
      handleAddNote(selection.cfiRange, selection.text);
      closeSelectionModal();
    },
    onCopyToClipboard: () => {
      if (!selection) return;
      handleCopyToClipboard(selection.text).catch((error) => {
        logger.error('Error copying to clipboard:', error);
      });
      closeSelectionModal();
    },
    onShare: () => {
      if (!selection) return;
      handleShare(selection.text).catch((error) => {
        logger.error('Error sharing text:', error);
      });
      closeSelectionModal();
    }
  };

  return (
    <>
      <ExpoStatusBar />
      <ReaderWrapper
        bookTitle={capitalize(trimTitle(initialTitle || ''))}
        bookId={bookId}
        isFocusedState={isFocusedState}
        isSelectionModalOpen={isSelectionModalOpen}
        closeSelectionModal={closeSelectionModal}
        actions={actions}
        isHighlightSelected={selection?.isHighlighted ?? false}
      >
        <EpubReader
          src={bookPath}
          manager="continuous"
          flow="scrolled"
          menuItems={[]}
          onBookStateUpdated={handleOnBookStateUpdated}
          onReaderStateUpdated={handleOnReaderStateUpdated}
          bookState={savedBookState}
          readerState={savedReaderState}
          onReady={handleOnReady}
          onAddNote={(note) => {
            // Find the latest note data from the book state
            const latestNote = savedBookState.notes.find((n) => n.id === note.id) || note;
            navigation.navigate('InTextComment', { noteItem: latestNote, bookId });
          }}
          onDoubleTap={() => setIsFocusedState((prev) => !prev)}
          theme={theme}
          onSelected={(selectedText, cfiRange) => handleOpenSelectionModal(cfiRange, selectedText)}
        />
      </ReaderWrapper>
    </>
  );
};
