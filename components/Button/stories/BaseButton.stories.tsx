import { StoryFn } from '@storybook/react';
import Icon from 'react-native-vector-icons/FontAwesome6';

import { ButtonProps, BaseButton } from '../BaseButton';

const Template: StoryFn<ButtonProps> = (args) => <BaseButton {...args} />;

export default {
  title: 'Buttons/BaseButton',
  component: BaseButton,
  argTypes: {
    onPress: { action: 'onPress' }
  }
};

export const Base = Template.bind({});
Base.args = {
  title: 'Primary'
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  title: 'With Icon',
  icon: <Icon name="google" size={20} color="green" />
};
