import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StoryFn } from '@storybook/react';

import { ButtonProps } from '../BaseButton';
import { OutlinedButton } from '../OutlinedButton';

const Template: StoryFn<ButtonProps> = (args) => <OutlinedButton {...args} />;

export default {
  title: 'Buttons/OutlinedButton',
  component: OutlinedButton,
  argTypes: {
    onPress: { action: 'onPress' }
  }
};

export const Outline = Template.bind({});
Outline.args = {
  title: 'Primary'
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  title: 'With Icon',
  icon: <FontAwesome name="google" size={20} color="green" />
};
