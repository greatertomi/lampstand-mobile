import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseButton, ButtonProps } from './BaseButton';
import { Theme, useTheme } from '../../styles';

type SecondaryButtonProps = {
  variant?: 'primary' | 'grey';
} & ButtonProps;

export const SecondaryButton = ({ variant = 'primary', ...rest }: SecondaryButtonProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <BaseButton
      style={[styles.secondaryButton, variant === 'primary' ? styles.primaryBorder : styles.greyBorder]}
      textStyles={variant === 'primary' ? styles.primaryText : styles.greyText}
      {...rest}
    />
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    primaryText: {
      color: theme.colors.primary
    },
    secondaryButton: {
      backgroundColor: theme.colors.background,
      borderWidth: 1
    },
    primaryBorder: {
      borderColor: theme.colors.primary
    },
    greyBorder: {
      borderColor: theme.colors.border
    },
    greyText: {
      color: theme.colors.slateGray
    }
  });
