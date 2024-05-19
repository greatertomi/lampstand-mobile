import React from 'react';
import { FlatList, View } from 'react-native';
import { useTheme } from '../../styles';
import { dummyTrendingBooks } from '../../utils';
import { FinishedBook } from './FinishedBook';

export const FinishedBooks = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;

  return (
    <View>
      <FlatList
        data={dummyTrendingBooks}
        renderItem={({ item }) => (
          <View style={utils.mb_4}>
            <FinishedBook
              title={item.title}
              author={item.author}
              image={item.image}
              description={item.description}
            />
          </View>
        )}
      />
    </View>
  );
};
