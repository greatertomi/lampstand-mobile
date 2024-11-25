import React from 'react';
import { StyleSheet } from 'react-native';

import { fontSizes } from '../../styles';

import { BaseText, TypographyProps } from './BaseText';

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
