import { StoryFn } from '@storybook/react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { ButtonProps } from '../BaseButton';
import { SecondaryButton } from '../SecondaryButton';

const Template: StoryFn<ButtonProps> = (args) => <SecondaryButton {...args} />;

export default {
  title: 'Buttons/SecondaryButton',
  component: SecondaryButton,
  argTypes: {
    onPress: { action: 'onPress' }
  }
};

export const Secondary = Template.bind({});
Secondary.args = {
  title: 'Primary'
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  title: 'With Icon',
  icon: <Icon name="google" size={20} color="green" />
};
