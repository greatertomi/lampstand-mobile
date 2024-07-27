import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../routes';
import { processEpubFile } from './util';

type BookProcessingRouteProp = RouteProp<RootStackParamList, 'BookProcessing'>;

// TODO: Still under construction
export const Reader = () => {
  const route = useRoute<BookProcessingRouteProp>();
  const { bookPath } = route.params;
  const [content, setBookContent] = useState('');
  const [bookStyles, setBookStyles] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { zipFile } = (await processEpubFile(bookPath)) || {};

      const contentHref = zipFile?.file('text/part0003_split_001.html');
      const bookContent = await contentHref?.async('string');

      const stylesHref = zipFile?.file('stylesheet.css');
      const currentBookStyle = (await stylesHref?.async('string')) || '';

      setBookContent(bookContent || 'a');
      setBookStyles(currentBookStyle);
    };

    fetchData();
  }, [bookPath]);

  return <WebView style={[styles.container, bookStyles]} source={{ html: content }} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    padding: 20,
    fontSize: 40
  }
});
