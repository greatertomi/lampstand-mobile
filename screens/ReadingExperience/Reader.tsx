import { useRoute, RouteProp as RNRouteProp } from '@react-navigation/native';
import React from 'react';

import { EpubReader } from '../../package/epub-reader';
import { RootStackParamList } from '../../routes';

import { ReaderWrapper } from './ReaderWrapper';

type RouteProp = RNRouteProp<RootStackParamList, 'Reader'>;

export const Reader = () => {
  const route = useRoute<RouteProp>();
  const { bookPath } = route.params;

  return (
    <ReaderWrapper bookTitle="Echoes of Eternity" pageNumber="2" totalPageNumber="100">
      <EpubReader src={bookPath} manager="continuous" flow="scrolled" />
    </ReaderWrapper>
  );
};
