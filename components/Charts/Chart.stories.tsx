import { StoryFn } from '@storybook/react';
import React from 'react';
import { Chart, ChartProps } from './Chart';
import { useDummyData } from './useDummyData';

export default {
  title: 'Barchart',
  component: Chart
};

const ChartWithDummyData = (args: ChartProps) => {
  const { dayData } = useDummyData();

  return <Chart {...args} barData={dayData} />;
};

export const DayChart: StoryFn<ChartProps> = (args) => <ChartWithDummyData {...args} />;

DayChart.args = {};
