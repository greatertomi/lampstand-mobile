import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { BookDetails, BookOverview, HeadingSmall } from '../../components';
import { dummyBooks } from '../../utils';
import { useTheme } from '../../styles';

export const CurrentReading = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;

  return (
    <View>
      <HeadingSmall style={styles.heading}>Current Reading</HeadingSmall>
      <BookDetails
        title="Testing Design"
        author="John Doe"
        image={require('../../assets/bookImages/bookOne.png')}
        categories={['Fiction', 'Science', 'Sport', 'Fiction', 'Science', 'Sport']}
        progress={0.7}
      />
      <HeadingSmall style={styles.heading}>Recently Added to the Library</HeadingSmall>
      <FlatList
        data={dummyBooks}
        renderItem={({ item }) => <BookOverview title={item.title} author={item.author} image={item.image} />}
        keyExtractor={(index) => index.toString()}
        horizontal
        contentContainerStyle={[utils.flex_dir_row, utils.gap_1]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontWeight: '700'
  }
});
