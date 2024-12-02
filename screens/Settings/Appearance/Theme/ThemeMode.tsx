import React from 'react';
import { StyleSheet, View } from 'react-native';

import { utilities } from '../../../../styles';

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
}: AppearanceProps) => (
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

const styles = StyleSheet.create({
  mode: {
    width: 76,
    height: 132,
    borderWidth: 2,
    borderRadius: 10,
    // eslint-disable-next-line no-restricted-syntax
    borderColor: '#e4dfdf',
    alignItems: 'center',
    position: 'relative'
  }
});
