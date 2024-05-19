import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseText, TypographyProps } from './BaseText';
import { fontSizes, fontWeights } from '../../styles';

export const BodyTextLarge = ({ children, style, ...rest }: TypographyProps) => (
  <BaseText {...rest} style={[styles.text, style]}>
    {children}
  </BaseText>
);

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.large,
    fontWeight: fontWeights.regular
  }
});
