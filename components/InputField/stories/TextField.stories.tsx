import { StoryFn } from '@storybook/react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { BaseFieldProps } from '../BaseField';
import { TextField } from '../TextField';

const Template: StoryFn<BaseFieldProps> = (args) => <TextField {...args} />;

export default {
  title: 'TextField',
  Component: TextField
};

export const textField = Template.bind({});
textField.args = {
  label: 'Text field',
  icon: <Icon name="user" size={20} />,
};
