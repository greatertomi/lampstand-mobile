import React from 'react';
import { View } from 'react-native';
import { utilities } from '../../styles';

const BOTTOM_TAB_HEIGHT = 60;

export const ScreenWrapper = ({ children }: { children: React.ReactNode }) => (
  <View style={[utilities.flex, { paddingBottom: BOTTOM_TAB_HEIGHT }]}>{children}</View>
);
