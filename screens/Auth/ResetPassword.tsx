import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContainer } from './AuthContainer';
import { ScreenDescription } from './ScreenDescription';
import { PrimaryButton, TextField } from '../../components';
import { useTheme } from '../../styles';

export const ResetPassword = () => {
  const { theme } = useTheme();
  return (
    <AuthContainer title="Reset Password">
      <ScreenDescription style={styles.desc}>
        Please enter your email address to request a password reset.
      </ScreenDescription>
      <View style={styles.resetPassword}>
        <TextField
          label="Email"
          placeholder="Please enter your email"
          required
          inputMode="email"
          autoCapitalize="none"
          icon={<MaterialCommunityIcons name="email-outline" size={20} color={theme.colors.slateGray} />}
        />
        <PrimaryButton title="Send" />
      </View>
    </AuthContainer>
  );
};

const styles = StyleSheet.create({
  desc: {
    marginBottom: 28
  },
  resetPassword: {
    gap: 130
  }
});
