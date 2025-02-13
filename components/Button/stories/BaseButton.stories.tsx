import FontAwesome from '@expo/vector-icons/FontAwesome';
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
  icon: <FontAwesome name="google" size={20} color="green" />
};
