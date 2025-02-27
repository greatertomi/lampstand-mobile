import { useRoute, RouteProp as RNRouteProp } from '@react-navigation/native';
import capitalize from 'lodash/capitalize';
import React, { useEffect, useState } from 'react';

import { EpubReader, useReader, TrackedState } from '../../package/epub-reader';
import { RootStackParamList } from '../../routes';
import { addBookState, getBookState } from '../../store';
import { logger } from '../../utils';
import { trimTitle } from '../../utils/trimBookTitle';

import { ReaderWrapper } from './ReaderWrapper';

type RouteProp = RNRouteProp<RootStackParamList, 'Reader'>;

export const Reader = () => {
  const [savedBookState, setSavedBookState] = useState<TrackedState>();
  const route = useRoute<RouteProp>();
  const { bookPath, bookTitle: initialTitle } = route.params;
  const { meta } = useReader();

  const [bookTitle, setBookTitle] = useState<string>(trimTitle(initialTitle || 'Loading...'));

  useEffect(() => {
    (async () => {
      try {
        const savedState = await getBookState(meta.title, meta.author);
        setSavedBookState(savedState as TrackedState);
      } catch (error) {
        logger.error('Error fetching saved state:', error);
      }
    })();
  }, [meta.author, meta.title]);

  useEffect(() => {
    setBookTitle(trimTitle(initialTitle || 'Loading...'));
  }, [initialTitle]);

  const handleOnStateUpdated = async (readerState: TrackedState) => {
    await addBookState(meta.title, meta.author, readerState);
  };

  return (
    <ReaderWrapper bookTitle={capitalize(bookTitle)}>
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
