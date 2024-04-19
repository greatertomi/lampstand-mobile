import React from 'react';
import { TypographyProps } from './TypographyProps';
import { StyleSheet, Text } from 'react-native';

export const HeadlineSmall = ({children}: TypographyProps) => {
  return (
    <Text style={styles.text}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontWeight: '500',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 22.68,
    color: '#222222',
    fontFamily: 'PlusJakarta'
  }
})
