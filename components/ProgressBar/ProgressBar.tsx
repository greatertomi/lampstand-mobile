import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import * as Progress from 'react-native-progress';

import { Theme, fontSizes, useTheme } from '../../styles';
import { formatBookProgress } from '../../utils';
import { BodyTextSmall } from '../Typography';

export type ProgressBarProps = {
  progress: number;
} & ViewProps;

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const utils = theme.utilities;

  return (
    <View style={[utils.flex_dir_row, utils.align_items_center]}>
      <Progress.Bar
        progress={progress}
        width={152}
        color={theme.colors.primary}
        borderWidth={0}
        borderRadius={4}
        unfilledColor={theme.colors.border}
      />
      <BodyTextSmall style={styles.text}>{formatBookProgress(progress)}</BodyTextSmall>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    text: {
      marginLeft: 5,
      color: theme.colors.text,
      fontSize: fontSizes.small
    }
  });
