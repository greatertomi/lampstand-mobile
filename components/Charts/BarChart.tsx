import React from 'react';
import { View } from 'react-native';
import { BarChart as Chart } from 'react-native-gifted-charts';
import { MaterialIcons } from '@expo/vector-icons';

import { useTheme, utilities } from '../../styles';
import { BodyTextLarge, TagText } from '../Typography';
import { ICON_SIZE } from '../../utils';

export type BarDataProps = {
  value: number;
  label?: string;
  spacing?: number;
  labelWidth?: number;
  labelTextStyle?: {
    color: string;
    textAlign: string;
  };
  frontColor: string;
};

export type ChartProps = {
  barData: BarDataProps[];
  title: string;
};

export const BarChart = ({ barData, title }: ChartProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const readingGoal = 70;

  return (
    <View>
      <View style={[utils.flex_dir_row, utils.justify_content_between, utils.align_items_center, utils.pb_3]}>
        <MaterialIcons name="keyboard-arrow-left" size={36} color={theme.colors.secondaryText} />
        <BodyTextLarge bold>{title}</BodyTextLarge>
        <MaterialIcons name="keyboard-arrow-right" size={36} color={theme.colors.secondaryText} />
      </View>
      <Chart
        data={barData}
        height={250}
        width={320}
        yAxisSide={1}
        yAxisLabelWidth={60}
        backgroundColor={theme.colors.background}
        spacing={16}
        barWidth={11}
        barBorderTopLeftRadius={20}
        barBorderTopRightRadius={20}
        xAxisThickness={1}
        yAxisThickness={1}
        yAxisOffset={0}
        adjustToWidth
        maxValue={readingGoal}
        highlightEnabled
        renderTooltip={(value: BarDataProps) => <TagText variant="default">{`${value.value} mins read`}</TagText>}
        stepValue={readingGoal / 5}
        xAxisColor={theme.colors.border}
        yAxisColor={theme.colors.border}
        yAxisIndicesColor={theme.colors.border}
        xAxisIndicesColor={theme.colors.border}
        yAxisLabelSuffix=" mins"
        dashGap={0}
        showVerticalLines
        verticalLinesSpacing={readingGoal}
      />
    </View>
  );
};
