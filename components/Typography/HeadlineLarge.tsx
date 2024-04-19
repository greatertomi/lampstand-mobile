import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TypographyProps } from './TypographyProps';

export const HeadlineLarge = ({ children }: TypographyProps) => <Text style={styles.text}>{children}</Text>;

const styles = StyleSheet.create({
  text: {
    fontWeight: '700',
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 30.24,
    color: '#222222',
    fontFamily: 'PlusJakarta'
  }
});
