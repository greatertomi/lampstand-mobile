import React from 'react';
import { useRoute, RouteProp as RNRouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../routes';
import { EpubReader } from '../../package/epub-reader';

type RouteProp = RNRouteProp<RootStackParamList, 'Reader'>;

export const Reader = () => {
  const route = useRoute<RouteProp>();
  const { bookPath } = route.params;

  return <EpubReader src={bookPath} manager="continuous" flow="scrolled" />;
};
