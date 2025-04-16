import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Theme, useTheme } from '../../styles';

import { SettingContainer } from './SettingContainer';
import { SettingList } from './SettingList';
import { SettingsType } from './types';

const baseUrl = process.env.EXPO_PUBLIC_FAQ_WEBSITE;

const faqs: SettingsType[] = [
  {
    title: 'FAQS',
    link: baseUrl
  },
  {
    title: 'Ask a Question',
    link: baseUrl
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
