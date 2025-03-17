import { StoryFn } from '@storybook/react';
import React from 'react';

import { BarChart, ChartProps } from './BarChart';
import { useDummyData } from './useDummyData';

export default {
  title: 'Barchart',
  component: BarChart
};

const ChartWithDayData = (args: ChartProps) => {
  const { dayData } = useDummyData();

  return <BarChart {...args} barData={dayData} />;
};

const ChartWithWeekData = (args: ChartProps) => {
  const { weekData } = useDummyData();

  return <BarChart {...args} barData={weekData} />;
};

export const DayChart: StoryFn<ChartProps> = (args) => <ChartWithDayData {...args} />;
export const WeekChart: StoryFn<ChartProps> = (args) => <ChartWithWeekData {...args} />;

DayChart.args = {
  title: 'Thursday, 7 October'
};
WeekChart.args = {
  title: 'This week'
};
