import { useNavigation, useRoute } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
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
import { trimTitle } from '../../utils/trimBookTitle';

import { createContextMenuItems } from './contextMenuItems';
import { DNDMessage } from './DNDMessage';
import { ReaderWrapper } from './ReaderWrapper';

const BOOK_STATE_DEBOUNCE_DELAY = 1000;

const debouncedAddBookState = debounce(async (id: string, state: BookTrackedState) => {
  await addBookState(id, state);
}, BOOK_STATE_DEBOUNCE_DELAY);

export const Reader = () => {
  const { books } = useBooks();
  const [savedReaderState, setSavedReaderState] = useState<ReaderTrackedState>();
  const route = useRoute<RouteNavigation<'Reader'>>();
  const navigation = useNavigation<ScreenNavigation<'InTextComment'>>();
  const { addHighlight, removeHighlight, addNote } = useReader();
  const { bookPath, bookId, bookTitle: initialTitle } = route.params;
  const { isAuthenticated } = useAuthState();
  const { addStartTime } = useReadTimeState();
  const { mode, theme } = useTheme();
  const [menuItemsToShow, setMenuItemsToShow] = useState<ReaderContextMenuItem[]>([]);
  const [isDNDOn, setIsDNDOn] = useState(false);

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

  useEffect(() => {
    (async () => {
      try {
        const getReaderState = JSON.parse(await getLocalStorageItem('readerState'));
        const readerStateWithTheme = {
          ...getReaderState,
          theme: mode
        };
        setSavedReaderState(readerStateWithTheme);
        await checkDNDStatus();
      } catch (error) {
        logger.error('Error fetching saved state:', error);
      }
    })();
  }, [mode]);

  const checkDNDStatus = async () => {
    try {
      const settings = await Notifications.getPermissionsAsync();
      // Approximate DND status based on notification permissions
      setIsDNDOn(settings.status !== 'granted');
    } catch {
      setIsDNDOn(false);
    }
  };

  const doesHighlightExist = (cfiRange: string): boolean =>
    savedBookState?.highlights?.some((highlight) => highlight.cfiRange === cfiRange) || false;

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

    const isExist = doesHighlightExist(cfiRange);

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

  const handleMenuItemSelection = (cfiRange: string) => {
    const hasHighlight = doesHighlightExist(cfiRange);
    if (hasHighlight) {
      setMenuItemsToShow(highlightedMenuItems);
    } else {
      setMenuItemsToShow(defaultMenuItems);
    }
  };

  return (
    <>
      {!isDNDOn && <DNDMessage />}
      <ReaderWrapper bookTitle={capitalize(trimTitle(initialTitle || ''))} bookId={bookId}>
        <EpubReader
          src={bookPath}
          manager="continuous"
          flow="scrolled"
          menuItems={menuItemsToShow}
          onBookStateUpdated={handleOnBookStateUpdated}
          onReaderStateUpdated={handleOnReaderStateUpdated}
          bookState={savedBookState}
          readerState={savedReaderState}
          onStarted={handleOnStarted}
          onAddNote={(note) => {
            navigation.navigate('InTextComment', { noteItem: note, bookId });
          }}
          theme={theme}
          onSelected={(_, cfiRange) => handleMenuItemSelection(cfiRange)}
        />
      </ReaderWrapper>
    </>
  );
};
