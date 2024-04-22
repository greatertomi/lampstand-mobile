import { StoryFn } from '@storybook/react';
import { TextField, TextFieldProps } from '../TextField';

const Template: StoryFn<TextFieldProps> = (args) => <TextField {...args} />;

export default {
  title: 'TextField',
  Component: TextField
};

export const DefaultTextField = Template.bind({});
DefaultTextField.args = {
  label: 'Text field'
};
