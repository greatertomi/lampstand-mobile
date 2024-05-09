import React from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { BookOverview, HeadingSmall } from '../../components';
import { useTheme } from '../../styles';
import { chunkArray } from '../../utils';
import { BookType } from '../../customTypes';

type LibrarySectionProps = {
  label: string;
  books: BookType[];
};

export const LibrarySection = ({ label, books }: LibrarySectionProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const chunkedBooks = chunkArray(books, 5);

  return (
    <>
      <HeadingSmall style={styles.heading}>{label}</HeadingSmall>
      <ScrollView contentContainerStyle={styles.container}>
        {chunkedBooks.map((chunk, index) => (
          <View key={index} style={utils.my_1}>
            <FlatList
              data={chunk}
              renderItem={({ item }) => (
                <BookOverview key={item.id} title={item.title} author={item.author} image={item.image} />
              )}
              horizontal
              contentContainerStyle={[utils.flex_dir_row, utils.gap_1]}
            />
          </View>
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 22
  },
  heading: {
    fontWeight: '700'
  }
});
