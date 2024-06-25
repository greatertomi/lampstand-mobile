import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BodyTextLarge, List } from '../../components';
import { Theme, useTheme, utilities } from '../../styles';
import { SettingsType } from './types';

interface SettingListProps {
  data: SettingsType[];
  title?: string;
}

export const SettingList = ({ data, title }: SettingListProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <View style={utilities.gap_1}>
      <BodyTextLarge style={styles.title}>{title}</BodyTextLarge>
      <View style={styles.list}>
        {data.map((setting) => (
          <List key={setting.id} icon={setting.icon} title={setting.title} variant={setting.variant} />
        ))}
      </View>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    title: {
      color: theme.colors.tertiaryText
    },
    list: {
      borderRadius: 10,
      backgroundColor: theme.colors.background
    }
  });
