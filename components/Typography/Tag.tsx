import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TypographyProps } from './BaseText';

export const Tag = ({ children }: TypographyProps) => <Text style={styles.text}>{children}</Text>;

const styles = StyleSheet.create({
  text: {
    fontWeight: '400',
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 12.6,
    color: '#222222',
    fontFamily: 'plus-jakarta-sans'
  }
});
