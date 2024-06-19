import { StoryFn } from '@storybook/react';
import { HalfCircle } from './HalfCircle';

const Template: StoryFn = () => <HalfCircle />;

export default {
  title: 'HalfCircle',
  component: HalfCircle
};

export const HalfChartStory = Template.bind({});
