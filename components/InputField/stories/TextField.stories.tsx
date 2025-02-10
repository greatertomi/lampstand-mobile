import { FontAwesome6 } from '@expo/vector-icons';
import { StoryFn } from '@storybook/react';
import { Text, View } from 'react-native';

import { BaseFieldProps } from '../BaseField';
import { TextField } from '../TextField';

const Template: StoryFn<BaseFieldProps> = (args) => (
  <View style={{ gap: 20, marginTop: 20 }}>
    <View>
      <Text>Input text without icon</Text>
      <TextField {...args} />
    </View>
    <View>
      <Text>Input text with icon</Text>
      <TextField {...args} icon={<FontAwesome6 name="user" size={20} />} />
    </View>
  </View>
);

export default {
  title: 'InputFields/TextField',
  Component: TextField
};

export const textField = Template.bind({});
textField.args = {
  label: 'Text field'
};
