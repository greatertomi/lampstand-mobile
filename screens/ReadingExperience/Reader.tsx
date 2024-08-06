import React, { useEffect, useState } from 'react';
import WebView from 'react-native-webview';
import { Image, StyleSheet } from 'react-native';
import { useRoute, RouteProp as RNRouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../routes';
import { BookContent, useBookRenderer } from '../../hooks';

type RouteProp = RNRouteProp<RootStackParamList, 'Reader'>;

export const Reader = () => {
  const route = useRoute<RouteProp>();
  const { item, bookPath } = route.params;
  const [bookContent, setBookContent] = useState<BookContent>({ type: 'string', content: '' });
  const { getContent } = useBookRenderer(bookPath);

  useEffect(() => {
    (async () => {
      const content = await getContent(item);
      setBookContent(content);
    })();
  }, []);

  if (bookContent?.type === 'base64') {
    return (
      <Image
        style={styles.image}
        source={{ uri: `data:image/jpeg;base64,${bookContent.content}` }}
        resizeMode="contain"
      />
    );
  }

  return <WebView style={styles.webview} source={{ html: bookContent.content }} />;
};

const styles = StyleSheet.create({
  webview: {
    flex: 1
  },
  image: {
    width: '80%',
    height: '80%',
    alignSelf: 'center',
    justifyContent: 'center'
  }
});
