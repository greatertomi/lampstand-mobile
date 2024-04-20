import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TypographyProps } from './BaseText';

export const HeadlineMedium = ({ children }: TypographyProps) => <Text style={styles.text}>{children}</Text>;

const styles = StyleSheet.create({
  text: {
    fontWeight: '600',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 25.2,
    color: '#222222',
    fontFamily: 'plus-jakarta-sans'
  }
});
