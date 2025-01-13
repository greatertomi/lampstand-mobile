import { StoryFn } from '@storybook/react';
import { Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { utilities } from '../../styles';

import { BottomSheet } from './BottomSheet';
import { PressableItem } from '../Pressable';
import { useState } from 'react';

const Template: StoryFn = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <GestureHandlerRootView style={utilities.flex}>
      <PressableItem style={[utilities.align_self_center]} onPress={() => setIsOpen(!isOpen)}>
        <Text>{isOpen ? 'Click to close!' : 'Click to open!'}</Text>
      </PressableItem>
      {isOpen && <BottomSheet onClose={() => setIsOpen(!isOpen)} />}
    </GestureHandlerRootView>
  );
};

export default {
  title: 'BottomSheet',
  Component: BottomSheet
};

export const Default = Template.bind({});
Default.args = {};
