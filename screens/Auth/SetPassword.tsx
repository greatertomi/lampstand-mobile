import React from 'react';
import { View } from 'react-native';
import { AuthContainer } from './AuthContainer';
import { ScreenDescription } from './ScreenDescription';
import { PasswordField, PrimaryButton } from '../../components';
import { PasswordRules } from './PasswordRules';
import { useTheme } from '../../styles';

export const SetPassword = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;

  return (
    <AuthContainer title="Set Password">
      <ScreenDescription>Set your password</ScreenDescription>
      <View style={[utils.gap_3, utils.mt_3]}>
        <PasswordField label="Password" required placeholder="Enter your password" />
        <PasswordField label="Confirm Password" required placeholder="Confirm password" />
        <PasswordRules />
        <View style={utils.mt_1}>
          <PrimaryButton title="Reset Password" />
        </View>
      </View>
    </AuthContainer>
  );
};
