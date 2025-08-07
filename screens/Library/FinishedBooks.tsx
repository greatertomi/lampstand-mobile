import { decode } from 'html-entities';
import React from 'react';
import { FlatList, View } from 'react-native';

import { VerticalBookOverview } from '../../components';
import { useBooks } from '../../context';
import { useTheme } from '../../styles';
import { hasFinishedBook } from '../../utils/hasFinishedBook';

export const FinishedBooks = () => {
  const { theme } = useTheme();
  const { books } = useBooks();
  const utils = theme.utilities;
  const finishedBooks = books.filter((book) =>
    hasFinishedBook(book?.state?.currentLocation?.end?.percentage, book.isFinished)
  );
  return (
    <FlatList
      data={finishedBooks}
      renderItem={({ item }) => {
        const cleanDescription = decode(item.description, { level: 'html5' });
        return (
          <View style={utils.mb_4}>
            <VerticalBookOverview
              id={item.id}
              title={item.title}
              author={item.author}
              cover={item.cover}
              filePath={item.filePath}
              mimeType={item.mimeType}
              description={cleanDescription}
              state={item.state}
              isFinished={item.isFinished}
            />
          </View>
        );
      }}
    />
  );
};
