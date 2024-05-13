import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseButton, ButtonProps } from './BaseButton';
import { Theme, useTheme } from '../../styles';

type SecondaryButtonProps = {
} & ButtonProps;

export const SecondaryButton = ({ ...rest }: SecondaryButtonProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <BaseButton
      style={styles.secondaryButton}
      {...rest}
    />
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    secondaryButton: {
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.primary
    },
  });
