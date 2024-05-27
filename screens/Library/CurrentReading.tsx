import React from 'react';
import { StyleSheet, View } from 'react-native';
import { dummyTrendingBooks } from '../../utils';
import { LibrarySection } from './LibrarySection';
import { CurrentBook, HeadingSmall } from '../../components';

export const CurrentReading = () => (
  <View style={styles.container}>
    <View style={styles.currentReadContainer}>
      <HeadingSmall bold>Currently Reading</HeadingSmall>
      <CurrentBook
        title="Testing Design"
        author="John Doe"
        image={require('../../assets/bookImages/bookOne.png')}
        categories={['Fiction', 'Science', 'Sport', 'Fiction', 'Science', 'Sport']}
        progress={0.7}
      />
    </View>
    <LibrarySection label="My Books" books={dummyTrendingBooks} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    gap: 16,
    marginBottom: 8,
  },
  currentReadContainer: {
    gap: 16,
    marginBottom: 30
  }
});
