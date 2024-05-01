import React from 'react';
import { StyleSheet, Text, View, ViewProps } from 'react-native';
import * as Progress from 'react-native-progress';
import { Theme, fontSizes, useTheme } from '../../styles';

export type ProgressBarProps = {
  progress: number;
} & ViewProps;

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const utils = theme.utilities;
  const formattedProgress = `${Math.round(progress * 100)}%`;

  return (
    <View style={[utils.flex_dir_row, utils.align_items_center]}>
      <Progress.Bar
        progress={progress}
        width={152}
        color={theme.colors.primary}
        borderColor={theme.colors.background}
        borderRadius={4}
        unfilledColor={theme.colors.cardBorderColor}
      />
      <Text style={styles.text}>{formattedProgress}</Text>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    text: {
      marginLeft: 5,
      color: theme.colors.text,
      fontSize: fontSizes.caption
    }
  });
