import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BodyText, PressableItem } from '../../../../components';
import { useReader } from '../../../../package/epub-reader';
import { useTheme, Theme as Skin, ThemeModeScheme } from '../../../../styles';

import { useThemeChoices } from './useThemeChoices';

export const Theme = () => {
  const { theme, setTheme, mode } = useTheme();
  const { changeTheme } = useReader();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);
  const appearances = useThemeChoices();

  const handleChangeTheme = (currentTheme: ThemeModeScheme) => {
    changeTheme(currentTheme);
    setTheme(currentTheme);
  };

  return (
    <View style={styles.section}>
      <View style={utils.gap_1}>
        <BodyText bold>Mode</BodyText>
        <View style={[utils.flex_dir_row, utils.align_items_center, utils.justify_content_evenly]}>
          {appearances.map((appearance, index) => (
            <PressableItem onPress={() => handleChangeTheme(appearance.title)} style={utils.gap_2} key={index}>
              <View style={[styles.selected, mode === appearance.title && { borderColor: theme.colors.primary }]}>
                {appearance.component}
              </View>
              <BodyText bold style={utils.text_center}>
                {appearance.title}
              </BodyText>
            </PressableItem>
          ))}
        </View>
      </View>
    </View>
  );
};

const createStyleSheet = (theme: Skin) =>
  StyleSheet.create({
    section: {
      backgroundColor: theme.colors.cardBackground,
      borderRadius: 10,
      padding: 12
    },
    selected: {
      borderRadius: 10,
      borderWidth: 2,
      padding: 4,
      borderColor: theme.colors.cardBackground
    }
  });
