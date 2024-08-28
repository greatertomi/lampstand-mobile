import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseButton, ButtonProps } from './BaseButton';
import { Theme, useTheme } from '../../styles';

export const SecondaryButton = ({ style, ...rest }: ButtonProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return <BaseButton style={[styles.secondaryButton, style]} textStyles={styles.text} {...rest} />;
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    secondaryButton: {
      backgroundColor: theme.colors.secondaryButtonBackground,
      borderWidth: 0
    },
    text: {
      color: theme.colors.primary
    }
  });
