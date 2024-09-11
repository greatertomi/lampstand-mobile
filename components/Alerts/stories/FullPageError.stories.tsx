import { StoryFn } from '@storybook/react';
import { offline } from '../../../assets/svg/offline';
import { FullPageError, FullPageErrorProps } from '../FullPageError';

const Template: StoryFn<FullPageErrorProps> = (args) => <FullPageError {...args} />;

export default {
  title: 'Error',
  component: FullPageError
};

export const error = Template.bind({});
error.args = {
  svg: offline,
  message: "Oops you're offline",
  description: 'sorry there is no internet connection, right now.'
};
