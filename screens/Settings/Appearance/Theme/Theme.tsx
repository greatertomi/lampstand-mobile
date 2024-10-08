import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useThemeChoices } from './useThemeChoices';
import { BodyText } from '../../../../components';
import { useTheme, Theme as Skin, ThemeModeScheme } from '../../../../styles';

export const Theme = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);
  const appearances = useThemeChoices();
  const [appearanceMode, setAppearanceMode] = useState<ThemeModeScheme>(ThemeModeScheme.Light);

  return (
    <View style={styles.section}>
      <View style={utils.gap_1}>
        <BodyText bold>Mode</BodyText>
        <View style={[utils.flex_dir_row, utils.align_items_center, utils.justify_content_evenly]}>
          {appearances.map((appearance, index) => (
            <Pressable onPress={() => setAppearanceMode(appearance.title)} style={utils.gap_2} key={index}>
              <View
                style={[styles.selected, appearanceMode === appearance.title && { borderColor: theme.colors.primary }]}
              >
                {appearance.component}
              </View>
              <BodyText bold style={utils.text_center}>
                {appearance.title}
              </BodyText>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

const createStyleSheet = (theme: Skin) =>
  StyleSheet.create({
    section: {
      backgroundColor: theme.colors.background,
      borderRadius: 10,
      padding: 12
    },
    selected: {
      borderRadius: 10,
      borderWidth: 2,
      padding: 4,
      borderColor: theme.colors.background
    }
  });
