import { StoryFn } from '@storybook/react';

import { Chart } from './Chart';

const Template: StoryFn = () => <Chart />;

export default {
  title: 'Barchart',
  component: Chart
};

export const BarChartStory = Template.bind({});
