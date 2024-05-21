import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseText, TypographyProps } from './BaseText';
import { fontSizes } from '../../styles';

export const HeadingSmall = ({ children, style, ...rest }: TypographyProps) => (
  <BaseText {...rest} style={[styles.text, style]}>
    {children}
  </BaseText>
);

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.h3
  }
});
