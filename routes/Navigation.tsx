import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigator } from './TabNavigator';

export const Navigation = () => (
  <NavigationContainer>
    <BottomTabNavigator />
  </NavigationContainer>
);
