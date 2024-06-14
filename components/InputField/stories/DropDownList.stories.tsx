import { useState } from 'react';
import { StoryFn } from '@storybook/react';
import { DropDownList, DropDownListProps } from '../DropDownList';

const Template: StoryFn<DropDownListProps> = (args) => {
  const [timeValue, setTimeValue] = useState<string | number>(0);

  return <DropDownList {...args} value={timeValue} handleOnChange={setTimeValue} />;
};

export default {
  title: 'DropdownList',
  component: DropDownList
};

export const dropDownList = Template.bind({});
dropDownList.args = {
  label: 'Dropdown',
  data: [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 }
  ]
};
