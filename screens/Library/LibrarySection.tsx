import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { BookOverview, HeadingSmall } from '../../components';
import { useTheme } from '../../styles';
import { BookType } from '../../customTypes';

type LibrarySectionProps = {
  label: string;
  books: BookType[];
};

export const LibrarySection = ({ label, books }: LibrarySectionProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;

  return (
    <View style={styles.container}>
      <HeadingSmall bold>{label}</HeadingSmall>
      <View>
        <View style={utils.my_1}>
          <FlatList
            data={books}
            renderItem={({ item }) => (
              <BookOverview key={item.id} title={item.title} author={item.author} image={item.image} />
            )}
            horizontal
            contentContainerStyle={[utils.flex_dir_row, utils.gap_1]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16
  }
});
