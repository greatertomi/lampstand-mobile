import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContainer } from './AuthContainer';
import { ScreenDescription } from './ScreenDescription';
import { PrimaryButton, TextField } from '../../components';
import { useTheme, utilities } from '../../styles';

export const ResetPassword = () => {
  const { theme } = useTheme();

  return (
    <AuthContainer title="Reset Password">
      <ScreenDescription style={utilities.mb_3}>
        Please enter your email address to request a password reset.
      </ScreenDescription>
      <TextField
        label="Email"
        placeholder="Please enter your email"
        required
        inputMode="email"
        autoCapitalize="none"
        icon={<MaterialCommunityIcons name="email-outline" size={20} color={theme.colors.slateGray} />}
      />
      <View style={utilities.mt_4}>
        <PrimaryButton title="Send" />
      </View>
    </AuthContainer>
  );
};
