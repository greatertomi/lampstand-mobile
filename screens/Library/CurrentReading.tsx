import React from 'react';
import { StyleSheet, View } from 'react-native';
import { dummyBooksYouMayLike, dummyRecentlyAddedBooks, dummyTrendingBooks } from '../../utils';
import { LibrarySection } from './LibrarySection';

export const CurrentReading = () => (
  <View style={styles.container}>
    <LibrarySection label="Trending books" books={dummyTrendingBooks} />
    <LibrarySection label="Recently added books" books={dummyRecentlyAddedBooks} />
    <LibrarySection label="Books friends are reading" books={dummyRecentlyAddedBooks} />
    <LibrarySection label="Books you may like" books={dummyBooksYouMayLike} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    gap: 16
  }
});
