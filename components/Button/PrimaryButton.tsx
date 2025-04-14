import React from 'react';
import { StyleSheet } from 'react-native';

import { Theme, useTheme } from '../../styles';

import { BaseButton, ButtonProps } from './BaseButton';

type PrimaryButtonProps = {
  variant?: 'primary' | 'danger' | 'transparent';
} & ButtonProps;

export const PrimaryButton = ({ variant = 'primary', style, ...rest }: PrimaryButtonProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const textColor = variant === 'transparent' ? styles.transparentText : styles.primaryText;

  const variantStyles = styles[variant];

  return <BaseButton style={[variantStyles, style]} textStyles={[textColor]} {...rest} />;
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    primary: {
      backgroundColor: theme.colors.primary,
      borderWidth: 0
    },
    primaryText: {
      color: theme.colors.white
    },
    danger: {
      backgroundColor: theme.colors.subtleError
    },
    transparent: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      color: theme.colors.text
    },
    transparentText: {
      color: theme.colors.text
    }
  });
