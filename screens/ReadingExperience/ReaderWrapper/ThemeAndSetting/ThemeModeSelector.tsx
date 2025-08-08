import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { systemCheck } from '../../../../assets';
import { PreferenceList } from '../../../../components';
import { useReader } from '../../../../package/epub-reader';
import { useTheme, ThemeModeScheme, Theme } from '../../../../styles';
import { ICON_SIZE } from '../../../../utils';

interface ThemeModeSelectorProps {
  onClose: () => void;
}

export const ThemeModeSelector = ({ onClose }: ThemeModeSelectorProps) => {
  const { theme, mode, setTheme } = useTheme();
  const styles = createStyleSheet(theme);
  const { updateTheme } = useReader();

  const themeModes = [
    {
      label: 'Light',
      type: ThemeModeScheme.Light,
      icon: 'sun' as const
    },
    {
      label: 'Dark',
      type: ThemeModeScheme.Dark,
      icon: 'moon' as const
    },
    {
      label: 'Match Device',
      type: ThemeModeScheme.System,
      icon: 'system' as const
    }
  ];

  return (
    <View style={styles.container}>
      {themeModes.map((themeMode, index) => (
        <PreferenceList
          key={index}
          title={themeMode.label}
          hasUnderline={index !== themeModes.length - 1}
          hasLeftIcon
          leftIcon={
            themeMode.icon === 'system' ? (
              <SvgXml xml={systemCheck(theme.colors.text)} />
            ) : (
              <Feather name={themeMode.icon} size={ICON_SIZE} color={theme.colors.text} />
            )
          }
          rightElement={
            mode === themeMode.type ? (
              <MaterialCommunityIcons name="check" size={ICON_SIZE} color={theme.colors.primary} />
            ) : null
          }
          onPress={() => {
            setTheme(themeMode.type);
            updateTheme(themeMode.type);
            onClose();
          }}
        />
      ))}
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      width: 173,
      bottom: '90%',
      right: '0%',
      padding: 8,
      backgroundColor: theme.colors.background,
      borderRadius: 10,
      zIndex: 10
    }
  });
