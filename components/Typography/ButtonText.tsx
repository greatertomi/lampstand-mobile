import React from 'react'
import { TypographyProps } from './TypographyProps';
import { StyleSheet, Text } from 'react-native';

export const ButtonText = ({children}: TypographyProps) => {
  return (
    <Text style={styles.text}>{children}</Text>
  )
};

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
