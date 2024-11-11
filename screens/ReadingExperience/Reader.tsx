import React from 'react';
import { useRoute, RouteProp as RNRouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../routes';
import { EpubReader } from '../../package/epub-reader';
import { ReadingWrapper } from './ReadingWrapper';

type RouteProp = RNRouteProp<RootStackParamList, 'Reader'>;

export const Reader = () => {
  const route = useRoute<RouteProp>();
  const { bookPath } = route.params;

  return (
    <ReadingWrapper bookTitle="Echoes of Eternity" pageNumber="200" totalPageNumber="1000">
      <EpubReader src={bookPath} manager="continuous" flow="scrolled" />
    </ReadingWrapper>
  );
};
