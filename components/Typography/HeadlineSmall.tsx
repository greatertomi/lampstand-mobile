import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TypographyProps } from './TypographyProps';

export const HeadlineSmall = ({ children }: TypographyProps) => <Text style={styles.text}>{children}</Text>;

const styles = StyleSheet.create({
  text: {
    fontWeight: '500',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 22.68,
    color: '#222222',
    fontFamily: 'PlusJakarta'
  }
});
