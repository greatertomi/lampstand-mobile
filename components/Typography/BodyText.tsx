import React from 'react'
import { StyleSheet, Text } from 'react-native';
import { TypographyProps } from './TypographyProps';

export const BodyText = ({children}: TypographyProps) => {
  return (
    <Text style={styles.text}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "400",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 17.64,
    color: '#222222',
    fontFamily: 'PlusJakarta'
  }
})
