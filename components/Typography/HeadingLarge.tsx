import React from 'react';
import { StyleSheet } from 'react-native';
import { fontSizes, fontWeights } from '../../styles';
import { BaseText, TypographyProps } from './BaseText';

export const HeadingLarge = ({ children, style, ...rest }: TypographyProps) => (
  <BaseText {...rest} style={[styles.text, style]}>
    {children}
  </BaseText>
);

const styles = StyleSheet.create({
  text: {
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.h1
  }
});
