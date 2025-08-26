import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Theme, useTheme } from '../../styles';
import { handleOpenURL } from '../../utils/helperFunctions';

import { SettingContainer } from './SettingContainer';
import { SettingList } from './SettingList';
import { SettingsType } from './types';

const PRIVACY_POLICY_URL = process.env.EXPO_PUBLIC_PRIVACY_POLICY;
const TERMS_URL = process.env.EXPO_PUBLIC_TERMS_OF_USE;

const legalItems: SettingsType[] = [
  {
    title: 'Privacy Policy',
    onPress: () => handleOpenURL(PRIVACY_POLICY_URL)
  },
  {
    title: 'Terms of Service',
    onPress: () => handleOpenURL(TERMS_URL)
  }
];

export const Legal = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <SettingContainer title="Legal">
      <View style={styles.container}>
        <SettingList data={legalItems} />
      </View>
    </SettingContainer>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderRadius: 10,
      padding: 10,
      backgroundColor: theme.colors.cardBackground
    }
  });
