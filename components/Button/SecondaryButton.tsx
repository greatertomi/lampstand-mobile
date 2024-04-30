import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseButton, ButtonProps } from './BaseButton';
import { Theme, useTheme } from '../../styles';

export const SecondaryButton = ({ ...rest }: ButtonProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return <BaseButton style={styles.secondary} textStyles={styles.secondaryText} {...rest} />;
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    secondaryText: {
      color: theme.colors.secondary
    },
    secondary: {
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.primary
    }
  });
