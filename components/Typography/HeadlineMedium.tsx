import React from 'react';
import { TypographyProps } from './TypographyProps';
import { StyleSheet, Text } from 'react-native';

export const HeadlineMedium = ({children}: TypographyProps) => {
  return (
    <Text style={styles.text}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontWeight: '600',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 25.2,
    color: '#222222',
    fontFamily: 'PlusJakarta'
  }
});
