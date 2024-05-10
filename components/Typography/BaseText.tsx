import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Theme, useTheme } from '../../styles';
import { important } from '../../assets/svg';

export interface TypographyProps extends TextProps {
  children: ReactNode;
  textStyles?: StyleProp<TextStyle>;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'error';
  required?: boolean;
  fontWeight?: boolean;
}

export const BaseText = ({
  children,
  style,
  fontWeight = false,
  required = false,
  variant = 'default',
  ...rest
}: TypographyProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const variantStyle = styles[variant];
  const fontWeightStyle: TextStyle = fontWeight ? { fontWeight: '700' } : { fontWeight: 'normal' };

  return (
    <Text style={[styles.text, variantStyle, fontWeightStyle, style]} {...rest}>
      {children}
      {required && <SvgXml xml={important} />}
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
