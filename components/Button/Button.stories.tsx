import { ButtonProps } from '../../types';
import { Button } from './Button';
import { Meta, StoryFn } from '@storybook/react';
import Icon from 'react-native-vector-icons/FontAwesome6';

const meta: Meta = {
  title: 'Components/Button',
  component: Button
};

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export default {
  ...meta,
  component: Button
};

export const Primary = Template.bind({});
Primary.args = {
  title: 'Primary',
  type: 'primary'
};

export const Secondary = Template.bind({});
Secondary.args = {
  title: 'Secondary',
  type: 'secondary'
};

export const Tetiary = Template.bind({});
Tetiary.args = {
  title: 'Tetiary',
  type: 'tetiary',
  icon: <Icon name="google" size={20} color="gray" />
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  title: 'With Icon',
  type: 'secondary',
  icon: <Icon name="google" size={20} color="green" />
};
