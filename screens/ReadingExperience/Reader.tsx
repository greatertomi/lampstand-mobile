import { useRoute } from '@react-navigation/native';
import capitalize from 'lodash/capitalize';
import React, { useEffect, useState } from 'react';

import { EpubReader, TrackedState } from '../../package/epub-reader';
import { RouteNavigation } from '../../routes';
import { addBookState, getBookState, useAuthState, useReadTimeState } from '../../store';
import { useTheme } from '../../styles';
import { logger } from '../../utils';
import { trimTitle } from '../../utils/trimBookTitle';

import { ReaderWrapper } from './ReaderWrapper';

export const Reader = () => {
  const [savedBookState, setSavedBookState] = useState<TrackedState>();
  const route = useRoute<RouteNavigation<'Reader'>>();
  const { bookPath, bookId, bookTitle: initialTitle } = route.params;
  const { isAuthenticated } = useAuthState();
  const { addStartTime } = useReadTimeState();
  const { mode } = useTheme();

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
    await addBookState(bookId, readerState);
  };

  return (
    <ReaderWrapper bookTitle={capitalize(trimTitle(initialTitle || ''))} bookId={bookId}>
      <EpubReader
        src={bookPath}
        manager="continuous"
        flow="scrolled"
        onStateUpdated={handleOnStateUpdated}
        initialState={savedBookState}
        initialLocation={savedBookState?.currentLocation?.start.cfi}
        onStarted={handleOnStarted}
      />
    </ReaderWrapper>
  );
};
