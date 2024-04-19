import React from 'react'
import { TypographyProps } from './TypographyProps';
import { StyleSheet, Text } from 'react-native';

export const SmallText = ({children}: TypographyProps) => {
  return (
    <Text style={styles.text}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontWeight: '400',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 15.12,
    color: '#222222',
    fontFamily: 'PlusJakarta'
  }
})
