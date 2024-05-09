import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BookDetails, HeadingSmall } from '../../components';
import { dummyBooks } from '../../utils';
import { useTheme } from '../../styles';
import { LibrarySection } from './LibrarySection';

export const CurrentReading = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;

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
      <LibrarySection label="Trending" books={dummyBooks} />
      <LibrarySection label="Recently Added" books={dummyBooks} />
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
