import { useRoute, RouteProp as RNRouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import { EpubReader, useReader, TrackedState } from '../../package/epub-reader';
import { RootStackParamList } from '../../routes';
import { addBookState, getBookState } from '../../store';

import { ReaderWrapper } from './ReaderWrapper';

type RouteProp = RNRouteProp<RootStackParamList, 'Reader'>;

export const Reader = () => {
  const [savedBookState, setSavedBookState] = useState<string | any>('');
  const route = useRoute<RouteProp>();
  const { bookPath } = route.params;
  const { meta } = useReader();
  console.log('Saved state:', savedBookState);

  const handleOnStateUpdated = async (readerState: TrackedState) => {
    await addBookState(meta.title, meta.author, readerState);
  };

  useEffect(() => {
    (async () => {
      try {
        const savedState = await getBookState(meta.title, meta.author);
        setSavedBookState(savedState);
      } catch (error) {
        console.error('Error fetching saved state:', error);
      }
    })();
  }, []);

  return (
    <ReaderWrapper bookTitle="Echoes of Eternity">
      <EpubReader
        src={bookPath}
        manager="continuous"
        flow="scrolled"
        onStateUpdated={handleOnStateUpdated}
        savedBookState={savedBookState}
      />
    </ReaderWrapper>
  );
};
