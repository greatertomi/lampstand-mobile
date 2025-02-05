import React from 'react';
import { FlatList, View } from 'react-native';

import { UploadedBook } from '../../store';
import { useTheme } from '../../styles';

import { FinishedBook } from './FinishedBook';

export const FinishedBooks = ({ books }: { books: UploadedBook[] }) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const finishedBooks = books.filter(
    (book) => (book?.state?.currentLocation?.start?.percentage ?? 0) >= 0.99 || book.progress === 1
  );
  return (
    <FlatList
      data={finishedBooks}
      renderItem={({ item }) => (
        <View style={utils.mb_4}>
          <FinishedBook title={item.title} author={item.author} cover={item.cover} />
        </View>
      )}
    />
  );
};
