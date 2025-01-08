import React from 'react';
import { StyleSheet } from 'react-native';

import { fontSizes } from '../../styles';
import { PressableItem } from '../Pressable';

import { BaseText, TypographyProps } from './BaseText';

export type LinkTextProps = {
  size?: 'small' | 'regular' | 'large';
  onPress?: () => void;
} & TypographyProps;

export const LinkText = ({ children, onPress, size = 'regular', style, ...rest }: LinkTextProps) => {
  const textSize = styles[size];

  return (
    <PressableItem onPress={onPress}>
      <BaseText {...rest} style={[textSize, style]}>
        {children}
      </BaseText>
    </PressableItem>
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
