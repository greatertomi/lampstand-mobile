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
    const styles = createStyleSheet(theme);

    return (
      <TextInput
        ref={ref}
        style={[styles.input, isActive && styles.active]}
        maxLength={1}
        keyboardType="numeric"
        textAlign="center"
        cursorColor={theme.colors.text}
        onChangeText={onChangeText}
        onKeyPress={onKeyPress}
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

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    active: {
      borderColor: theme.colors.primary
    },
    input: {
      width: 44,
      height: 39,
      borderWidth: 1,
      borderColor: theme.colors.border,
      textAlign: 'center',
      borderRadius: 5,
      fontSize: 14
    }
  });

export const OTPInput = OTPInputComponent;
