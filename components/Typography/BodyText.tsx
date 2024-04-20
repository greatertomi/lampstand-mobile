import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TypographyProps } from './BaseText';

export const BodyText = ({ children }: TypographyProps) => <Text style={styles.text}>{children}</Text>;

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 17.64,
    color: '#222222',
    fontFamily: 'plus-jakarta-sans'
  }
});
