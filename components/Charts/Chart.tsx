import React from 'react';
import { View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { useTheme, utilities } from '../../styles';
import { TagText } from '../Typography';

type BarDataProps = {
  value: number;
  label?: string;
  spacing?: number;
  labelWidth?: number;
  labelTextStyle?: any;
  frontColor: string;
};

export type ChartProps = {
  barData: BarDataProps[];
};

export const Chart = ({ barData }: ChartProps) => {
  const { theme } = useTheme();
  const readingGoal = 70;

  return (
    <View style={utilities.width_100}>
      <BarChart
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
        renderTooltip={(value: BarDataProps) => (
          <View>
            <TagText variant="default">{`${value.value} mins read`}</TagText>
          </View>
        )}
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
