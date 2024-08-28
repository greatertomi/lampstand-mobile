import { StoryFn } from '@storybook/react';
import Icon from 'react-native-vector-icons/FontAwesome6';
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
  icon: <Icon name="google" size={20} color="green" />
};
