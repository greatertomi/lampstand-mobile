import { useState } from 'react';
import { StoryFn } from '@storybook/react';
import { BaseFieldProps } from '../BaseField';
import { PasswordField } from '../PasswordField';

const Template: StoryFn<BaseFieldProps> = (args) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return <PasswordField passwordVisible={passwordVisible} setPasswordVisible={setPasswordVisible} {...args} />;
};

export default {
  title: 'Password',
  Component: PasswordField
};

export const passwordField = Template.bind({});
passwordField.args = {
  label: 'Password'
};
