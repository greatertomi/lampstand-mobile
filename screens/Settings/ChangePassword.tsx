import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SettingContainer } from './SettingContainer';
import { PasswordField } from '../../components';
import { Theme, useTheme } from '../../styles';

export const ChangePassword = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <SettingContainer
      title="Change Password"
      useButton
      buttonTitle="Save"
    >
      <View style={styles.fieldsContainer}>
        <PasswordField label="Current Password" />
        <PasswordField label="New Password" />
        <PasswordField label="Confirm new password" />
      </View>
    </SettingContainer>
  );
};

const createStyleSheet = (theme: Theme) => StyleSheet.create({
  fieldsContainer: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: theme.colors.background
  }
});
