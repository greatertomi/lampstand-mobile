import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native';
import { Theme, useTheme } from '../../styles';

export interface TypographyProps extends TextProps {
  children: ReactNode;
  textStyles?: StyleProp<TextStyle>;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'white' | 'error';
  bold?: boolean;
}

export const BaseText = ({ children, style, bold = false, variant = 'default', ...rest }: TypographyProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const variantStyle = styles[variant];

  return (
    <Text style={[styles.text, variantStyle, bold && styles.bold, style]} {...rest}>
      {children}
    </Text>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    text: {
      fontFamily: theme.fontFamily.plusJakartaSans
    },
    default: {
      color: theme.colors.text
    },
    primary: {
      color: theme.colors.primary
    },
    secondary: {
      color: theme.colors.secondaryText
    },
    success: {
      color: theme.colors.success
    },
    error: {
      color: theme.colors.yellowError
    },
    white: {
      color: theme.colors.white
    },
    bold: {
      fontWeight: 'bold'
    }
  });
