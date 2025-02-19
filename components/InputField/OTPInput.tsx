import React, { forwardRef } from 'react';
import { TextInput, TextInputProps, StyleSheet, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';

import { Theme, useTheme } from '../../styles';

export type OTPInputProps = {
  isActive: boolean;
  value: string;
  onChangeText: (text: string) => void;
  onKeyPress: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
  onBlur: () => void;
  autoFocus: boolean;
  returnKeyType: TextInputProps['returnKeyType'];
  onSubmitEditing: () => void;
} & TextInputProps;

const OTPInputComponent = forwardRef<TextInput, OTPInputProps>(
  ({ isActive, value, onChangeText, onKeyPress, onBlur, autoFocus, returnKeyType, onSubmitEditing, ...props }, ref) => {
    const { theme } = useTheme();
    const styles = createStyleSheet(theme, isActive);

    return (
      <TextInput
        ref={ref}
        style={[styles.input, isActive && styles.active]}
        maxLength={1}
        keyboardType="numeric"
        textAlign="center"
        cursorColor={theme.colors.primary}
        onChangeText={onChangeText}
        onKeyPress={onKeyPress}
        selectionColor={theme.colors.primary}
        value={value}
        onBlur={onBlur}
        autoFocus={autoFocus}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        {...props}
      />
    );
  }
);

OTPInputComponent.displayName = 'OTPInput';

const createStyleSheet = (theme: Theme, isActive: boolean) =>
  StyleSheet.create({
    active: {
      borderColor: theme.colors.primary
    },
    input: {
      width: 73,
      height: 60,
      borderWidth: isActive ? 2 : 0,
      backgroundColor: theme.colors.cardBackground,
      color: theme.colors.white,
      textAlign: 'center',
      borderRadius: 8,
      fontSize: 22
    }
  });

export const OTPInput = OTPInputComponent;
