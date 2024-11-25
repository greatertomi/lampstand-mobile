import { StoryFn } from '@storybook/react';
import { useState } from 'react';

import { DropdownData, DropdownPicker, DropdownPickerProps } from '../DropdownPicker';

export const testData = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' }
];

const Template: StoryFn<DropdownPickerProps> = (args) => {
  const [value, setValue] = useState('');

  return (
    <DropdownPicker
      {...args}
      onChange={(item: DropdownData) => setValue(item.value.toString())}
      label="Select Item"
      value={value}
      data={testData}
    />
  );
};

export default {
  title: 'DropdownPicker',
  component: DropdownPicker
};

export const DropdownPickerStory = Template.bind({});
