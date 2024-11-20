import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Theme, useTheme, utilities } from '../../../../styles';

import { BottomLeft, BottomRight, TopLeft, TopRight } from './ThemeComponents';
import { ThemeSkeleton } from './ThemeSkeleton';

interface AppearanceProps {
  topLeftDivBackground: string;
  topRightDivBackground: string;
  bottomLeftDivBackground: string;
  bottomRightDivBackground: string;
}

export const ThemeMode = ({
  topRightDivBackground,
  topLeftDivBackground,
  bottomLeftDivBackground,
  bottomRightDivBackground
}: AppearanceProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <View style={styles.mode}>
      <View style={utilities.flex_dir_row}>
        {TopLeft(topLeftDivBackground)}
        {TopRight(topRightDivBackground)}
      </View>
      <ThemeSkeleton />
      <View style={utilities.flex_dir_row}>
        {BottomLeft(bottomLeftDivBackground)}
        {BottomRight(bottomRightDivBackground)}
      </View>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    mode: {
      width: 76,
      height: 132,
      borderWidth: 2,
      borderRadius: 10,
      borderColor: theme.colors.border,
      alignItems: 'center',
      position: 'relative'
    }
  });
