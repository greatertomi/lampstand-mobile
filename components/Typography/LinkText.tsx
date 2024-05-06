import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { BaseText, TypographyProps } from './BaseText';
import { Theme, fontSizes, fontWeights, useTheme } from '../../styles';

export type LinkTextProps = {
  type?: 'small' | 'regular' | 'large';
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'error';
} & TypographyProps;

export const LinkText = ({ children, variant = 'default', type = 'regular', style, ...rest }: LinkTextProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const textType = type === 'regular' || !type ? styles.text : styles[type];
  const variantStyle = variant === 'default' || !variant ? styles.default : styles[variant];

  return (
    <Pressable style={({ pressed }) => [pressed && { opacity: 0.5 }]}>
      <BaseText {...rest} style={[styles.text, style, textType, variantStyle]}>
        {children}
      </BaseText>
    </Pressable>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    text: {
      fontSize: fontSizes.body,
      fontWeight: fontWeights.regular
    },
    large: {
      fontSize: fontSizes.h3
    },
    small: {
      fontSize: fontSizes.small
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
