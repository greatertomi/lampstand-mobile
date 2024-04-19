import React from 'react'
import { TypographyProps } from './TypographyProps';
import { StyleSheet, Text } from 'react-native';

export const Tag = ({children}: TypographyProps) => {
  return (
    <Text style={styles.text}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontWeight: '400',
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 12.6,
    color: '#222222',
    fontFamily: 'PlusJakarta'
  }
})
