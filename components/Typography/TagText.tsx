import React from 'react';
import { StyleSheet } from 'react-native';

import { fontFamily, fontSizes } from '../../styles';
import { scaleFontSize } from '../../utils';

import { BaseText, TypographyProps } from './BaseText';

export const TagText = ({ children, style, ...rest }: TypographyProps) => (
  <BaseText {...rest} style={[styles.text, style]}>
    {children}
  </BaseText>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: fontFamily.plusJakartaSans,
    fontSize: scaleFontSize(fontSizes.caption)
  }
});
