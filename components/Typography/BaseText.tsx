import React, { ReactNode } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { Theme, useTheme } from '../../styles';

export interface TypographyProps extends TextProps {
  children: ReactNode;
}

export const BaseText = ({ children, ...rest }: TypographyProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <Text style={styles.text} {...rest}>
      {children}
    </Text>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    text: {
      color: theme.colors.text,
      fontFamily: theme.fontFamily.plusJakartaSans
    }
  });
