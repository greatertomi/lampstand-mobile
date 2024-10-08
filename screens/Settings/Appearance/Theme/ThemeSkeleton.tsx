import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../../../styles';
import { FullGraySlab, FullPrimarySlab, HalfGraySlab, RoundDots } from './ThemeComponents';

export const ThemeSkeleton = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;

  return (
    <View style={styles.skeleton}>
      <View style={{ gap: 3 }}>
        <View style={[utils.align_self_center]}>{FullGraySlab()}</View>
        <View style={[utils.align_self_center]}>{HalfGraySlab()}</View>
      </View>
      <View style={[utils.align_items_center, utils.gap_3]}>
        <View style={[utils.flex_dir_row, { gap: 2 }]}>
          {Array.from({ length: 5 }, (_, index) => (
            <View key={index}>{RoundDots()}</View>
          ))}
        </View>
        {FullPrimarySlab()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'space-between',
    padding: 10,
    zIndex: 10
  }
});
