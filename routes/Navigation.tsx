import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { createRef } from 'react';

import { BottomTabNavigator } from './BottomTabNavigator';
import { screens } from './screen-paths';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const navigationRef = createRef<NavigationContainerRef<RootStackParamList> | null>();

const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="BottomTab" component={BottomTabNavigator} options={{ headerShown: false }} />
    {screens.map((screen) => (
      <Stack.Screen key={screen.name} name={screen.name} component={screen.component} options={screen.options} />
    ))}
  </Stack.Navigator>
);

export const Navigation = () => (
  <NavigationContainer ref={navigationRef}>
    <StackNavigator />
  </NavigationContainer>
);
