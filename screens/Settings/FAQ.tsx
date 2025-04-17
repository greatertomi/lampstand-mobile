import React from 'react';
import { Linking, StyleSheet, View } from 'react-native';

import { Theme, useTheme } from '../../styles';
import { logger } from '../../utils';

import { SettingContainer } from './SettingContainer';
import { SettingList } from './SettingList';
import { SettingsType } from './types';

const FAQ_URL = process.env.EXPO_PUBLIC_FAQ_WEBSITE;

const handleOpenURL = async () => {
  const isValidUrl = await Linking.canOpenURL(FAQ_URL).catch(() => false);
  if (isValidUrl) {
    await Linking.openURL(FAQ_URL);
  } else {
    logger.error('Invalid URL:', FAQ_URL);
  }
};

const faqs: SettingsType[] = [
  {
    title: 'FAQS',
    onPress: handleOpenURL
  },
  {
    title: 'Ask a Question',
    onPress: handleOpenURL
  }
];

export const FAQ = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <SettingContainer title="FAQ and Support">
      <View style={styles.container}>
        <SettingList data={faqs} />
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
