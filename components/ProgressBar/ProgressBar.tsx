import React from 'react';
import { Text, View, ViewProps } from 'react-native';
import * as Progress from 'react-native-progress';
import { fontSizes, useTheme } from '../../styles';

export type ProgressBarProps = {
  progress: number;
} & ViewProps;

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  const { theme } = useTheme();
  const _s = theme.utilities;
  const formattedProgress = `${Math.round(progress * 100)}%`;

  return (
    <View style={[_s.flex_dir_row, _s.align_items_center]}>
      <Progress.Bar
        progress={progress}
        width={152}
        color={theme.colors.primary}
        borderColor={theme.colors.background}
        borderRadius={4}
        unfilledColor={theme.colors.cardBorderColor}
      />
      <Text style={{ marginLeft: 5, color: theme.colors.text, fontSize: fontSizes.caption }}>{formattedProgress}</Text>
    </View>
  );
};
