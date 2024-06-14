import { StoryFn } from '@storybook/react';
import { Barchart } from './Barchart';

const Template: StoryFn = () => <Barchart />;

export default {
  title: 'Barchart',
  component: Barchart
};

export const BarChartStory = Template.bind({});
