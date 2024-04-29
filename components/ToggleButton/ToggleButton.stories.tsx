import { useState } from 'react';
import { StoryFn } from '@storybook/react';
import { ToggleButton, ToggleButtonProps } from './ToggleButton';

const Template: StoryFn<ToggleButtonProps> = (args) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const onValueChange = (value: boolean) => setIsEnabled(value);

  return <ToggleButton {...args} isEnabled={isEnabled} onValueChange={onValueChange} />;
};

export default {
  title: 'ToggleButton',
  Component: ToggleButton
};

export const Togglebutton = Template.bind({});
