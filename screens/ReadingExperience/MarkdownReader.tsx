import React from 'react';
import Markdown from 'react-native-markdown-display';
import { ScrollView, View } from 'react-native';
import { text1 } from '../../utils/data/readingText';

export const MarkdownReader = () => (
  <View style={{ flex: 1 }}>
    <ScrollView showsHorizontalScrollIndicator={false} scrollEnabled={false} contentContainerStyle={{ width: '100%' }}>
      <Markdown>{text1}</Markdown>
    </ScrollView>
  </View>
);
