import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { BodyText } from '../../../../components';
import { useTheme, Theme as Skin } from '../../../../styles';

import { useThemeChoices } from './useThemeChoices';

export const Theme = () => {
  const { theme, toggleTheme, mode } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);
  const appearances = useThemeChoices();

  return (
    <View style={styles.section}>
      <View style={utils.gap_1}>
        <BodyText bold>Mode</BodyText>
        <View style={[utils.flex_dir_row, utils.align_items_center, utils.justify_content_evenly]}>
          {appearances.map((appearance, index) => (
            <Pressable onPress={() => toggleTheme(appearance.title)} style={utils.gap_2} key={index}>
              <View style={[styles.selected, mode === appearance.title && { borderColor: theme.colors.primary }]}>
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
