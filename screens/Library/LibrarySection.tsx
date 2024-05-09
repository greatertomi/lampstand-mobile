import React from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { BookOverview, HeadingSmall } from '../../components';
import { Theme, useTheme } from '../../styles';
import { chunkArray } from '../../utils';
import { BookType } from '../../customTypes';

type LibrarySectionProps = {
  label: string;
  books: BookType[];
};

export const LibrarySection = ({ label, books }: LibrarySectionProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);
  const chunkedBooks = chunkArray(books, 5);

  return (
    <View style={styles.container}>
      <HeadingSmall style={styles.heading}>{label}</HeadingSmall>
      <ScrollView style={{ maxHeight: 450 }} nestedScrollEnabled>
        <View style={styles.innerContainer}>
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
        </View>
      </ScrollView>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: theme.colors.cardBorderColor,
      padding: 4,
      borderRadius: 10
    },
    innerContainer: {
      paddingBottom: 16
    },
    heading: {
      fontWeight: '700',
      paddingVertical: 4
    }
  });
