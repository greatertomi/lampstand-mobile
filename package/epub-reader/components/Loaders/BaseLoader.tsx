import React from 'react';
import { ActivityIndicator, DimensionValue, StyleSheet, Text, View } from 'react-native';

interface Props {
  width?: DimensionValue;
  height?: DimensionValue;
  message: string;
}

export const BaseLoader = ({ width = '100%', height = '100%', message }: Props) => (
  <View style={[styles.container, { width, height }]}>
    <ActivityIndicator size="large" />

    <Text style={styles.text}>{message}</Text>
  </View>
);

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'white'
  },
  text: {
    marginTop: 20,
    fontSize: 18
  }
});
