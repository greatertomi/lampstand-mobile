import React from 'react';
import { StyleSheet } from 'react-native';

import { Theme, useTheme } from '../../styles';

import { BaseButton, ButtonProps } from './BaseButton';

export const OutlinedButton = ({ style, ...rest }: ButtonProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return <BaseButton style={[styles.outlineButton, style]} {...rest} />;
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    outlineButton: {
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.primary
    }
  });
