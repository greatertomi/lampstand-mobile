import React from 'react';
import { StoryFn } from '@storybook/react';
import { BarchartComponent, BarchartProps } from './BarchartComponent';

export default {
  title: 'Bar',
  component: BarchartComponent,
};

const Template: StoryFn<BarchartProps> = (args) => <BarchartComponent {...args} />;

export const BarChartStory = Template.bind({});
BarChartStory.args = {
  data: [
    { value: 250, label: 'M' },
    { value: 500, label: 'T' },
    { value: 745, label: 'W' },
    { value: 320, label: 'T' },
    { value: 600, label: 'F' },
    { value: 256, label: 'S' },
    { value: 300, label: 'S' },
  ],
};
