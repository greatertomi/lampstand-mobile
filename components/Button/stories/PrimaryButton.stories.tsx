import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StoryFn } from '@storybook/react';

import { ButtonProps } from '../BaseButton';
import { PrimaryButton } from '../PrimaryButton';

const Template: StoryFn<ButtonProps> = (args) => <PrimaryButton {...args} />;

export default {
  title: 'Buttons/PrimaryButton',
  component: PrimaryButton,
  argTypes: {
    onPress: { action: 'onPress' }
  }
};

export const Primary = Template.bind({});
Primary.args = {
  title: 'Primary'
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  title: 'With Icon',
  icon: <FontAwesome name="google" size={20} color="green" />
};
