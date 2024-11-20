import { StoryFn } from '@storybook/react';
import { Text } from 'react-native';

import { ProgressSemiCircle, ProgressSemiCircleProps } from './ProgressSemiCircle';

const Template: StoryFn<ProgressSemiCircleProps> = (args) => <ProgressSemiCircle {...args} />;

export default {
  title: 'ProgressSemiCircle',
  component: ProgressSemiCircle
};

export const semiCircle = Template.bind({});
semiCircle.args = {
  progress: 1,
  children: <Text>Welcome</Text>
};
