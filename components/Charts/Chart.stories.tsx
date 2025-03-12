import { StoryFn } from '@storybook/react';
import React from 'react';

import { Chart, ChartProps } from './Chart';
import { useDummyData } from './useDummyData';

export default {
  title: 'Barchart',
  component: Chart
};

const ChartWithDayData = (args: ChartProps) => {
  const { dayData } = useDummyData();

  return <Chart {...args} barData={dayData} />;
};

const ChartWithWeekData = (args: ChartProps) => {
  const { weekData } = useDummyData();

  return <Chart {...args} barData={weekData} />;
};

export const DayChart: StoryFn<ChartProps> = (args) => <ChartWithDayData {...args} />;
export const WeekChart: StoryFn<ChartProps> = (args) => <ChartWithWeekData {...args} />;

DayChart.args = {};
WeekChart.args = {};
