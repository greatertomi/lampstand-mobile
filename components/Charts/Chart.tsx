import React from 'react';
import { View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { useTheme, utilities } from '../../styles';
import { TagText } from '../Typography';

type barDataProps = {
  value: number;
  label?: string;
  spacing?: number;
  labelWidth?: number;
  labelTextStyle?: any;
  frontColor: string;
};

export const Chart = () => {
  const { theme } = useTheme();
  const frontColor = theme.colors.primary;
  const spacing = 1;
  const labelWidth = 80;
  const labelTextStyle = { color: theme.colors.secondaryText, textAlign: 'left' };
  const readingGoal = 70;

  const barData: barDataProps[] = [
    {
      value: 40,
      label: 'Sun',
      spacing,
      labelWidth,
      labelTextStyle,
      frontColor
    },
    { value: 50, spacing, frontColor },
    { value: 50, spacing, frontColor },
    { value: 70, frontColor },
    {
      value: 30,
      label: 'Mon',
      spacing,
      labelWidth,
      labelTextStyle,
      frontColor
    },
    { value: 10, frontColor },
    {
      value: 55,
      label: 'Tues',
      spacing,
      labelWidth,
      labelTextStyle,
      frontColor
    },
    { value: 25, spacing, frontColor },
    { value: 25, spacing, frontColor },
    { value: 25, frontColor },
    {
      value: 30,
      label: 'Wed',
      spacing,
      labelWidth,
      labelTextStyle,
      frontColor
    },
    { value: 12, spacing, frontColor },
    { value: 43, spacing, frontColor },
    { value: 23, spacing, frontColor },
    { value: 52, spacing, frontColor },
    { value: 11, frontColor },
    {
      value: 60,
      label: 'Thur',
      spacing,
      labelWidth,
      labelTextStyle,
      frontColor
    },
    { value: 40, frontColor },
    {
      value: 65,
      label: 'Fri',
      spacing,
      labelWidth,
      labelTextStyle,
      frontColor
    },
    { value: 30, spacing, frontColor },
    { value: 30, frontColor }
  ];
  return (
    <View style={utilities.px_1}>
      <BarChart
        data={barData}
        height={250}
        width={350}
        yAxisSide={1}
        yAxisLabelWidth={40}
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
        renderTooltip={(value: barDataProps) => (
          <View>
            <TagText variant="default">{`${value.value} mins read`}</TagText>
          </View>
        )}
        stepValue={readingGoal / 5}
        xAxisColor={theme.colors.border}
        yAxisColor={theme.colors.border}
        yAxisIndicesColor={theme.colors.border}
        xAxisIndicesColor={theme.colors.border}
        dashGap={0}
        showVerticalLines
        verticalLinesSpacing={readingGoal}
      />
    </View>
  );
};
