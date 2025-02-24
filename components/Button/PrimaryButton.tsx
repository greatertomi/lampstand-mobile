import React from 'react';
import { StyleSheet } from 'react-native';

import { Theme, useTheme } from '../../styles';

import { BaseButton, ButtonProps } from './BaseButton';

type PrimaryButtonProps = {
  variant?: 'primary' | 'danger';
} & ButtonProps;

export const PrimaryButton = ({ variant = 'primary', style, ...rest }: PrimaryButtonProps) => {
  const { theme } = useTheme();
  const backgroundColor = variant === 'primary' ? theme.colors.primary : theme.colors.subtleError;
  const styles = createStyleSheet(theme, backgroundColor);

  return <BaseButton style={[styles.primary, style]} textStyles={styles.primaryText} {...rest} />;
};

const createStyleSheet = (theme: Theme, backgroundColor: string) =>
  StyleSheet.create({
    primary: {
      backgroundColor,
      borderWidth: 0
    },
    primaryText: {
      color: theme.colors.white
    }
  });
