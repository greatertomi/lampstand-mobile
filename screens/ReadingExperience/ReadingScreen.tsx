import React from 'react';
import { Reader } from '@epubjs-react-native/core';
import { SafeAreaView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useFileSystem } from '@epubjs-react-native/expo-file-system';
import { RootStackParamList } from '../../routes';

type ReadingScreenRouteProp = RouteProp<RootStackParamList, 'ReadingScreen'>;

export const ReadingScreen = () => {
  const route = useRoute<ReadingScreenRouteProp>();
  const bookPath = route.params?.bookPath;

  return (
    <SafeAreaView style={{ flex: 1 }}>{bookPath && <Reader src={bookPath} fileSystem={useFileSystem} />}</SafeAreaView>
  );
};
