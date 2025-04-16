import { useRoute } from '@react-navigation/native';
import capitalize from 'lodash/capitalize';
import debounce from 'lodash/debounce';
import React, { useEffect, useState } from 'react';

import { EpubReader, BookTrackedState, ReaderTrackedState } from '../../package/epub-reader';
import { RouteNavigation } from '../../routes';
import { addBookState, getBookState, useAuthState, useReadTimeState } from '../../store';
import { useTheme } from '../../styles';
import { getLocalStorageItem, logger, setLocalStorageItem } from '../../utils';
import { trimTitle } from '../../utils/trimBookTitle';

import { ReaderWrapper } from './ReaderWrapper';
import { useHighlightMenu, MenuItemType } from './useHighlightMenu';

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
  const [menuItemsToShow, setMenuItemsToShow] = useState<MenuItemType[] | []>([]);

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
        setSavedReaderState(readerStateWithTheme);
      } catch (error) {
        logger.error('Error fetching saved state:', error);
      }
    })();
  }, [bookId, mode]);

  const checkForExistingHighlight = (cfiRange: string) =>
    savedBookState?.highlights?.find((highlight) => highlight.cfiRange === cfiRange);

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

  const { menuItems1, menuItems2 } = useHighlightMenu({
    theme,
    bookId
  });

  const handleMenuItemSelection = (cfiRange: string) => {
    const doesHighlightExist = checkForExistingHighlight(cfiRange);
    if (doesHighlightExist) {
      setMenuItemsToShow(menuItems2);
    } else {
      setMenuItemsToShow(menuItems1);
    }
  };

  return (
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
        theme={theme}
        onSelected={(text, cfiRange) => handleMenuItemSelection(cfiRange)}
      />
    </ReaderWrapper>
  );
};
