import { useRoute, RouteProp as RNRouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import { EpubReader, useReader, TrackedState } from '../../package/epub-reader';
import { RootStackParamList } from '../../routes';
import { addBookState, getBookState } from '../../store';
import { logger } from '../../utils';

import { ReaderWrapper } from './ReaderWrapper';

type RouteProp = RNRouteProp<RootStackParamList, 'Reader'>;

export const Reader = () => {
  const [savedBookState, setSavedBookState] = useState<TrackedState>();
  const route = useRoute<RouteProp>();
  const { bookPath } = route.params;
  const { meta } = useReader();

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

  const handleOnStateUpdated = async (readerState: TrackedState) => {
    await addBookState(meta.title, meta.author, readerState);
  };

  return (
    <ReaderWrapper bookTitle="Echoes of Eternity">
      <EpubReader
        src={bookPath}
        manager="continuous"
        flow="scrolled"
        onStateUpdated={handleOnStateUpdated}
        initialState={savedBookState}
      />
    </ReaderWrapper>
  );
};
