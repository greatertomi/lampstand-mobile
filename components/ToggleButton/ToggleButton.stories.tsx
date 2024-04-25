import { useState } from 'react';
import { StoryFn } from '@storybook/react';
import { ToggleButton, ToggleButtonProps } from './ToggleButton';

const Template: StoryFn<ToggleButtonProps> = (args) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const onValueChange = (value: boolean) => setIsEnabled(value);

  return <ToggleButton isEnabled={isEnabled} onValueChange={onValueChange} {...args} />;
};

export default {
  title: 'ToggleButton',
  Component: ToggleButton
};

export const Togglebutton = Template.bind({});
Togglebutton.args = {
  primary: true
};

export const BlackTogglebutton = Template.bind({});
BlackTogglebutton.args = {
  primary: false
};
