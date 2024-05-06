import { useState } from 'react';
import { StoryFn } from '@storybook/react';
import { CheckBox, CheckBoxType } from './CheckBox';

const Template: StoryFn<CheckBoxType> = (args) => {
  const [isChecked, setIsChecked] = useState(false);

  const onValueChange = (value: boolean) => setIsChecked(value);

  return <CheckBox {...args} isChecked={isChecked} onValueChange={onValueChange} />;
};

export default {
  title: 'CheckBox',
  Component: CheckBox
};

export const Default = Template.bind({});
Default.args = {
  label: 'label goes here',
  variant: 'grey'
};
