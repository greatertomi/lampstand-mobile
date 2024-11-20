import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { fontSizes } from '../../styles';

import { BaseText, TypographyProps } from './BaseText';

export type LinkTextProps = {
  size?: 'small' | 'regular' | 'large';
  onPress?: () => void;
} & TypographyProps;

export const LinkText = ({ children, onPress, size = 'regular', style, ...rest }: LinkTextProps) => {
  const textSize = styles[size];

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [pressed && { opacity: 0.5 }]}>
      <BaseText {...rest} style={[textSize, style]}>
        {children}
      </BaseText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  regular: {
    fontSize: fontSizes.body
  },
  large: {
    fontSize: fontSizes.large
  },
  small: {
    fontSize: fontSizes.small
  }
});
