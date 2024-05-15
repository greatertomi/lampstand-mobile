import React from 'react';
import { StyleSheet, View } from 'react-native';
import { dummyTrendingBooks } from '../../utils';
import { LibrarySection } from './LibrarySection';

export const CurrentReading = () => (
  <View style={styles.container}>
    <LibrarySection label="Recently Added to the Library" books={dummyTrendingBooks} />
    <LibrarySection label="Based on your Picks" books={dummyTrendingBooks} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    gap: 16
  }
});
