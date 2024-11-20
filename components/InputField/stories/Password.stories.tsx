import { StoryFn } from '@storybook/react';

import { BaseFieldProps } from '../BaseField';
import { PasswordField } from '../PasswordField';

const Template: StoryFn<BaseFieldProps> = (args) => <PasswordField {...args} />;

export default {
  title: 'InputFields/Password',
  Component: PasswordField
};

export const passwordField = Template.bind({});
passwordField.args = {
  label: 'Password'
};
