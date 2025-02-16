import React from 'react';
import { FlatList, View } from 'react-native';

import { VerticalBookOverview } from '../../components';
import { UploadedBook } from '../../store';
import { useTheme } from '../../styles';
import { hasFinishedBook } from '../../utils/hasFinishedBook';

export const FinishedBooks = ({ books }: { books: UploadedBook[] }) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const finishedBooks = books.filter((book) =>
    hasFinishedBook(book?.state?.currentLocation?.end?.percentage, book.isFinished)
  );
  return (
    <FlatList
      data={finishedBooks}
      renderItem={({ item }) => (
        <View style={utils.mb_4}>
          <VerticalBookOverview
            title={item.title}
            author={item.author}
            cover={item.cover}
            filePath={item.filePath}
            mimeType={item.mimeType}
            description={item.description}
            state={item.state}
            isFinished={item.isFinished}
          />
        </View>
      )}
    />
  );
};
