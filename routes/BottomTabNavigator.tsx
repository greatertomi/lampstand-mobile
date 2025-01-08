import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { BOTTOM_TAB_HEIGHT } from '../utils';

import { CustomBottomTab } from './CustomBottomTab';
import { tabScreens } from './screen-paths';

const Tab = createBottomTabNavigator();
const CustomBottomTabs = (props: BottomTabBarProps) => <CustomBottomTab {...props} />;

export const BottomTabNavigator = () => (
  <Tab.Navigator
    tabBar={CustomBottomTabs}
    screenOptions={{ tabBarShowLabel: false, headerShown: false }}
    sceneContainerStyle={{ marginBottom: BOTTOM_TAB_HEIGHT }}
  >
    {tabScreens.map((screen) => (
      <Tab.Screen key={screen.name} name={screen.name} component={screen.component} />
    ))}
  </Tab.Navigator>
);
