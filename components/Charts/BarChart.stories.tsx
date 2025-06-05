import { StoryFn } from '@storybook/react';
import React from 'react';

import { BarChartProps, ChartType } from '../../types';

import { BarChart } from './BarChart';
import { dayData, weekData } from './dummyData';

export default {
  title: 'Barchart',
  component: BarChart
};

const ChartWithDayData = (args: BarChartProps) => <BarChart {...args} barData={dayData} />;

const ChartWithWeekData = (args: BarChartProps) => <BarChart {...args} barData={weekData} />;

const ChartwithNoData = (args: BarChartProps) => <BarChart {...args} barData={[]} />;

const LoadingChartState = (args: BarChartProps) => <BarChart {...args} isLoading barData={[]} />;

export const DayChart: StoryFn<BarChartProps> = (args) => <ChartWithDayData {...args} />;
export const WeekChart: StoryFn<BarChartProps> = (args) => <ChartWithWeekData {...args} />;
export const EmptyChart: StoryFn<BarChartProps> = (args) => <ChartwithNoData {...args} />;
export const LoadingChart: StoryFn<BarChartProps> = (args) => <LoadingChartState {...args} />;

DayChart.args = {
  title: 'Thursday, 7 October',
  type: ChartType.DAY,
  isAnimated: true,
  maxValue: 70
};
WeekChart.args = {
  title: 'This week',
  type: ChartType.WEEK,
  isAnimated: true,
  maxValue: 70
};

EmptyChart.args = {
  title: 'No data available',
  type: ChartType.DAY,
  isAnimated: false,
  maxValue: 70
};

LoadingChart.args = {
  title: 'Loading Chart',
  type: ChartType.DAY,
  isAnimated: false,
  maxValue: 70
};
