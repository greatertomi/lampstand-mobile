import { StoryFn } from '@storybook/react';
import React from 'react';

import { BarChart, ChartProps } from './BarChart';
import { dayData, weekData } from './dummyData';

export default {
  title: 'Barchart',
  component: BarChart
};

const ChartWithDayData = (args: ChartProps) => <BarChart {...args} barData={dayData} />;

const ChartWithWeekData = (args: ChartProps) => <BarChart {...args} barData={weekData} />;

export const DayChart: StoryFn<ChartProps> = (args) => <ChartWithDayData {...args} />;
export const WeekChart: StoryFn<ChartProps> = (args) => <ChartWithWeekData {...args} />;

DayChart.args = {
  title: 'Thursday, 7 October',
  type: 'day',
  isAnimated: true,
  maxValue: 70
};
WeekChart.args = {
  title: 'This week',
  type: 'week',
  isAnimated: true,
  maxValue: 70
};
