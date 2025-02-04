import React from 'react';
import { StyleSheet } from 'react-native';

import { Theme, useTheme } from '../../styles';

import { BaseButton, ButtonProps } from './BaseButton';

export const PrimaryButton = ({ style, ...rest }: ButtonProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return <BaseButton style={[styles.primary, style]} textStyles={styles.primaryText} {...rest} />;
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    primary: {
      backgroundColor: theme.colors.primary,
      borderWidth: 0
    },
    primaryText: {
      color: theme.colors.text
    }
  });
