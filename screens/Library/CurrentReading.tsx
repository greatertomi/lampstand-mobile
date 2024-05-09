import React from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { BookDetails, BookOverview, HeadingSmall } from '../../components';
import { chunkArray, dummyBooks } from '../../utils';
import { useTheme } from '../../styles';

export const CurrentReading = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;

  const chunkedBooks = chunkArray(dummyBooks, 5);

  return (
    <>
      <View style={utils.gap_1}>
        <HeadingSmall style={styles.heading}>Current Reading</HeadingSmall>
        <BookDetails
          title="Testing Design"
          author="John Doe"
          image={require('../../assets/bookImages/bookOne.png')}
          categories={['Fiction', 'Science', 'Sport', 'Fiction', 'Science', 'Sport']}
          progress={0.7}
        />
      </View>
      <HeadingSmall style={styles.heading}>Recently Added to the Library</HeadingSmall>
      <ScrollView contentContainerStyle={styles.container}>
        {chunkedBooks.map((chunk, index) => (
          <View key={index.toString()} style={utils.my_1}>
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
