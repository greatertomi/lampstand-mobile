import { StoryFn } from '@storybook/react';
import { ToggleButton, ToggleButtonProps } from './ToggleButton';

const Template: StoryFn<ToggleButtonProps> = (args) => <ToggleButton {...args}/>;

export default {
  title: 'ToggleButton',
  Component: ToggleButton
};

export const Togglebutton = Template.bind({});
Togglebutton.args = {
  color: 'white',
  backgroundColor: '#ea4335'
}

export const BlackTogglebutton = Template.bind({});
BlackTogglebutton.args = {
  color: 'white',
  backgroundColor: 'black'
}