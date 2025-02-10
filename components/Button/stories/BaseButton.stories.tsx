import { FontAwesome6 } from '@expo/vector-icons';
import { StoryFn } from '@storybook/react';

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
  icon: <FontAwesome6 name="google" size={20} color="green" />
};
