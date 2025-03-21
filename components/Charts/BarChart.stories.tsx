import { StoryFn } from '@storybook/react';
import React from 'react';

import { BarChartProps } from '../../types';

import { BarChart } from './BarChart';
import { dayData, weekData } from './dummyData';

export default {
  title: 'Barchart',
  component: BarChart
};

const ChartWithDayData = (args: BarChartProps) => <BarChart {...args} barData={dayData} />;

const ChartWithWeekData = (args: BarChartProps) => <BarChart {...args} barData={weekData} />;

export const DayChart: StoryFn<BarChartProps> = (args) => <ChartWithDayData {...args} />;
export const WeekChart: StoryFn<BarChartProps> = (args) => <ChartWithWeekData {...args} />;

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
