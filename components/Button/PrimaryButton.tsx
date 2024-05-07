import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseButton, ButtonProps } from './BaseButton';
import { Theme, useTheme } from '../../styles';

export const PrimaryButton = (props: ButtonProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return <BaseButton style={styles.primary} textStyles={styles.primaryText} {...props} />;
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    primary: {
      backgroundColor: theme.colors.primary,
      borderWidth: 0
    },
    primaryText: {
      color: theme.colors.buttonPrimaryTitle
    }
  });
