import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BodyTextLarge, List } from '../../components';
import { Theme, useTheme, utilities } from '../../styles';
import { RootStackParamList, ScreenNavigation } from '../../routes';
import { SettingsType } from './types';

interface SettingListProps {
  data: SettingsType[];
  title?: string;
}

export const SettingList = ({ data, title }: SettingListProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const navigation = useNavigation<ScreenNavigation<keyof RootStackParamList>>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePress = (link: any) => {
    navigation.navigate(link);
  };

  return (
    <View style={utilities.gap_1}>
      {title && <BodyTextLarge variant="tertiary">{title}</BodyTextLarge>}
      <View style={styles.list}>
        {data.map((setting, index) => (
          <List
            key={setting.id || index}
            icon={setting.icon}
            title={setting.title}
            defaultState={setting.defaultState}
            variant={setting.variant}
            onPress={setting.onPress || (setting.link && (() => handlePress(setting.link)))}
          />
        ))}
      </View>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    list: {
      borderRadius: 10,
      backgroundColor: theme.colors.background
    }
  });
