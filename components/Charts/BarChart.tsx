import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, View } from 'react-native';
import { BarChart as Chart } from 'react-native-gifted-charts';

import { useTheme } from '../../styles';
import { BodyTextLarge, TagText } from '../Typography';

export type BarChartDataProps = {
  value: number;
  label?: string;
};

export type ChartProps = {
  barData: BarChartDataProps[];
  title: string;
  type: 'day' | 'week';
  maxValue?: number;
  width?: number;
  isAnimated?: boolean;
};

export const BarChart = ({
  barData,
  title,
  type,
  width = Dimensions.get('window').width - 100,
  isAnimated = true,
  maxValue
}: ChartProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const readingGoal = 70;
  const labelWidth = type === 'day' ? 60 : 10;
  const spacing = type === 'day' ? 1 : 34;
  const labelTextStyle =
    type === 'week'
      ? { color: theme.colors.secondaryText, textAlign: 'center' }
      : { color: theme.colors.secondaryText, textAlign: 'left' };

  const barStyles = {
    spacing,
    labelWidth,
    labelTextStyle
  };

  const updatedBarData = barData.map((item, index, arr) => {
    if (type === 'week') {
      return { ...item, ...barStyles };
    }

    const isNextHavingLabel = arr[index + 1]?.label !== undefined;
    return isNextHavingLabel ? item : { ...item, ...barStyles };
  });

  return (
    <View>
      <View style={[utils.flex_dir_row, utils.justify_content_between, utils.align_items_center, utils.pb_3]}>
        <MaterialIcons name="keyboard-arrow-left" size={36} color={theme.colors.secondaryText} />
        <BodyTextLarge bold>{title}</BodyTextLarge>
        <MaterialIcons name="keyboard-arrow-right" size={36} color={theme.colors.secondaryText} />
      </View>
      <Chart
        data={updatedBarData}
        isAnimated={isAnimated}
        animationDuration={800}
        height={250}
        width={width}
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
        maxValue={maxValue}
        highlightEnabled
        renderTooltip={(value: BarChartDataProps) => <TagText variant="default">{`${value.value} mins read`}</TagText>}
        stepValue={(maxValue ?? readingGoal) / 5}
        xAxisColor={theme.colors.border}
        yAxisColor={theme.colors.border}
        yAxisIndicesColor={theme.colors.border}
        xAxisIndicesColor={theme.colors.border}
        yAxisLabelSuffix=" mins"
        dashGap={0}
        showVerticalLines
        verticalLinesSpacing={maxValue}
        frontColor={theme.colors.primary}
      />
    </View>
  );
};
