import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { BaseText, TypographyProps } from './BaseText';
import { fontSizes } from '../../styles';

export type LinkTextProps = {
  size?: 'small' | 'regular' | 'large';
} & TypographyProps;

export const LinkText = ({ children, size = 'regular', style, ...rest }: LinkTextProps) => {
  const textSize = styles[size];

  return (
    <Pressable style={({ pressed }) => [pressed && { opacity: 0.5 }]}>
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
