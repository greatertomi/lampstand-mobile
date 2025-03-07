import { useRoute, RouteProp as RNRouteProp } from '@react-navigation/native';
import capitalize from 'lodash/capitalize';
import React, { useEffect, useState } from 'react';

import { EpubReader, TrackedState } from '../../package/epub-reader';
import { RootStackParamList } from '../../routes';
import { addBookState, getBookState } from '../../store';
import { logger } from '../../utils';
import { trimTitle } from '../../utils/trimBookTitle';

import { ReaderWrapper } from './ReaderWrapper';

type RouteProp = RNRouteProp<RootStackParamList, 'Reader'>;

export const Reader = () => {
  const [savedBookState, setSavedBookState] = useState<TrackedState>();
  const route = useRoute<RouteProp>();
  const { bookPath, bookId, bookTitle: initialTitle } = route.params;

  useEffect(() => {
    (async () => {
      try {
        const savedState = await getBookState(bookId);
        setSavedBookState(savedState as TrackedState);
      } catch (error) {
        logger.error('Error fetching saved state:', error);
      }
    })();
  }, [bookId]);

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
      />
    </ReaderWrapper>
  );
};
