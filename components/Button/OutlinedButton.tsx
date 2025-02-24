import React from 'react';
import { StyleSheet } from 'react-native';

import { Theme, useTheme } from '../../styles';

import { BaseButton, ButtonProps } from './BaseButton';

type OutlineButtonProps = {
  variant?: 'primary' | 'secondary';
} & ButtonProps;

export const OutlinedButton = ({ style, variant = 'primary', ...rest }: OutlineButtonProps) => {
  const { theme } = useTheme();
  const borderColor = variant === 'primary' ? theme.colors.primary : theme.colors.border;
  const styles = createStyleSheet(theme, borderColor);

  return <BaseButton style={[styles.outlineButton, style]} {...rest} />;
};

const createStyleSheet = (theme: Theme, borderColor: string) =>
  StyleSheet.create({
    outlineButton: {
      borderWidth: 1,
      borderColor
    }
  });
