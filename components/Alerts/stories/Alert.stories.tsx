import { StoryFn } from '@storybook/react';

import { Alert, AlertProps } from '../Alert';

const Template: StoryFn<AlertProps> = (args) => <Alert {...args} />;

export default {
  title: 'Alert',
  component: Alert
};

export const successAlert = Template.bind({});
successAlert.args = {
  variant: 'success',
  message: 'Something went wrong. Please check your internet connection and try again.'
};

export const errorAlert = Template.bind({});

errorAlert.args = {
  variant: 'error',
  message: 'Something went wrong. Please check your internet connection and try again.'
};
