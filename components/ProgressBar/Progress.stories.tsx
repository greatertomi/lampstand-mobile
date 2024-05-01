import { StoryFn } from '@storybook/react';
import { ProgressBar, ProgressBarProps } from './ProgressBar';

const Template: StoryFn<ProgressBarProps> = (args) => <ProgressBar {...args} />;

export default {
  title: 'Others/Progress',
  component: ProgressBar
};

export const progressBar = Template.bind({});
progressBar.args = {
  progress: 0.2
};
