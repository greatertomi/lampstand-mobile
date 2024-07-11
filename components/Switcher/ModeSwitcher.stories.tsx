import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';
import { ModeSwitcher, ModeSwitcherProps } from './ModeSwitcher';

const Template: StoryFn<ModeSwitcherProps> = (args) => {
  const [selectedMode, setSelectedMode] = useState<boolean>(false);

  return <ModeSwitcher {...args} isSelected={selectedMode} onPress={() => setSelectedMode(!selectedMode)} />;
};

export default {
  title: 'ModeSwitcher',
  component: ModeSwitcher
};

export const modeSwitcher = Template.bind({});
modeSwitcher.args = {
  title: 'Personal Mode',
  description: 'All notifications will be silenced till you turn this mode off',
  image: require('../../assets/images/personalMode.png')
};
