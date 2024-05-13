import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native';
import { Theme, useTheme } from '../../styles';

export interface TypographyProps extends TextProps {
  children: ReactNode;
  textStyles?: StyleProp<TextStyle>;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'error';
  bold?: boolean;
}

export const BaseText = ({
  children,
  style,
  bold = false,
  variant = 'default',
  ...rest
}: TypographyProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const variantStyle = styles[variant];
  const boldStyle: TextStyle | false = bold && { fontWeight: 'bold' };

  return (
    <Text style={[styles.text, variantStyle, boldStyle, style]} {...rest}>
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
      color: theme.colors.secondary
    },
    success: {
      color: theme.colors.success
    },
    error: {
      color: theme.colors.error
    }
  });
