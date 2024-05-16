import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../styles';
import { dummyTrendingBooks } from '../../utils';
import { FinishedBook } from './FinishedBook';

export const FinishedBooks = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;

  return (
    <View style={utils.gap_2}>
      {dummyTrendingBooks.map((book) => (
        <FinishedBook
          key={book.id}
          title={book.title}
          author={book.author}
          image={book.image}
          description={book.description}
        />
      ))}
    </View>
  );
};
