import React from 'react';
import { FlatList, View } from 'react-native';

import { UploadedBook } from '../../store';
import { useTheme } from '../../styles';
import { hasFinishedBook } from '../../utils/hasFinishedBook';

import { FinishedBook } from './FinishedBook';

export const FinishedBooks = ({ books }: { books: UploadedBook[] }) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const finishedBooks = books.filter((book) =>
    hasFinishedBook(book?.state?.currentLocation?.end?.percentage, book.progress)
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
