import React from 'react';
import { StyleSheet } from 'react-native';

import { fontSizes } from '../../styles';
import { scaleFontSize } from '../../utils';
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
    fontSize: scaleFontSize(fontSizes.body)
  },
  large: {
    fontSize: scaleFontSize(fontSizes.large)
  },
  small: {
    fontSize: scaleFontSize(fontSizes.small)
  }
});
