import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { CustomBottomTab } from './CustomBottomTab';
import { tabScreens } from './screen-paths';

const Tab = createBottomTabNavigator();
const CustomBottomTabs = (props: BottomTabBarProps) => <CustomBottomTab {...props} />;

export const BottomTabNavigator = () => (
  <Tab.Navigator tabBar={CustomBottomTabs} screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
    {tabScreens.map((screen) => (
      <Tab.Screen key={screen.name} name={screen.name} component={screen.component} />
    ))}
  </Tab.Navigator>
);
