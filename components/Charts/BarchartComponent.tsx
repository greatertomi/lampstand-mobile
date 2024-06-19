import React from 'react';
import { View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { useTheme } from '../../styles';

type BarChartDataItem = {
  value: number;
  label: string;
};

export interface BarchartProps {
  data: BarChartDataItem[];
}

export const BarchartComponent = ({ data }: BarchartProps) => {
  const { theme } = useTheme();

  return (
    <View>
      <BarChart
        barWidth={20}
        barBorderTopLeftRadius={8}
        barBorderTopRightRadius={8}
        frontColor={theme.colors.primary}
        yAxisThickness={0}
        xAxisThickness={0}
        data={data}
        rulesType="solid"
        maxValue={70}
        stepValue={10}
      />
    </View>
  );
};
