import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

import { useTheme } from '../styles';

interface SeparatorProps {
  direction?: 'horizontal' | 'vertical';
  thickness?: number;
  length?: number | `${number}%`;
  color?: string;
  margin?: number;
}

export const Separator: React.FC<SeparatorProps> = ({
  direction = 'vertical',
  thickness = StyleSheet.hairlineWidth,
  length,
  color,
  margin = 0
}) => {
  const { theme } = useTheme();
  const separatorColor = color ?? theme.colors.text;

  // fallback: visible separator if parent has no height
  const defaultLength: number | `${number}%` = direction === 'vertical' ? 20 : '100%';
  const finalLength = length ?? defaultLength;

  const style: ViewStyle =
    direction === 'vertical'
      ? {
          width: thickness,
          height: finalLength,
          backgroundColor: separatorColor,
          marginHorizontal: margin
        }
      : {
          height: thickness,
          width: finalLength,
          backgroundColor: separatorColor,
          marginVertical: margin
        };

  return <View style={[styles.separator, style]} />;
};

const styles = StyleSheet.create({
  separator: {
    alignSelf: 'center'
  }
});
