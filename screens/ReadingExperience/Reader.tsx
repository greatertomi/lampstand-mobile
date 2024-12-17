import { useRoute, RouteProp as RNRouteProp } from '@react-navigation/native';
import React from 'react';

import { EpubReader, useReader } from '../../package/epub-reader';
import { TrackedState } from '../../package/epub-reader/provider';
import { RootStackParamList } from '../../routes';
import { addBookState } from '../../store';

import { ReaderWrapper } from './ReaderWrapper';

type RouteProp = RNRouteProp<RootStackParamList, 'Reader'>;

export const Reader = () => {
  const route = useRoute<RouteProp>();
  const { bookPath } = route.params;
  const { meta } = useReader();

  const handleOnStateUpdated = async (readerState: TrackedState) => {
    await addBookState(meta.title, meta.author, readerState);
  };

  return (
    <ReaderWrapper bookTitle="Echoes of Eternity" pageNumber="200" totalPageNumber="1000">
      <EpubReader src={bookPath} manager="continuous" flow="scrolled" onStateUpdated={handleOnStateUpdated} />
    </ReaderWrapper>
  );
};
