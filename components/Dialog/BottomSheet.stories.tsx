import { StoryFn } from '@storybook/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { utilities } from '../../styles';

import { BottomSheet } from './BottomSheet';

const Template: StoryFn = () => (
  <GestureHandlerRootView style={utilities.flex}>
    <BottomSheet />
  </GestureHandlerRootView>
);

export default {
  title: 'BottomSheet',
  Component: BottomSheet
};

export const Default = Template.bind({});
Default.args = {};
