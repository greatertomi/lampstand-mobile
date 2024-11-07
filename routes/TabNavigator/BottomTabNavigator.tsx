import React from 'react';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CustomBottomTab } from './CustomBottomTab';
import { MyBooksStackNavigator, SettingsStackNavigator } from '../Stacks';
import { ScreenWrapper } from './ScreenWrapper';

const Tab = createBottomTabNavigator();
const CustomBottomTabs = (props: BottomTabBarProps) => <CustomBottomTab {...props} />;

export const BottomTabNavigator = () => (
  <Tab.Navigator tabBar={CustomBottomTabs} screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
    <Tab.Screen name="MyBooks" options={{ headerShown: false }}>
      {() => (
        <ScreenWrapper>
          <MyBooksStackNavigator />
        </ScreenWrapper>
      )}
    </Tab.Screen>
    <Tab.Screen name="Settings" options={{ headerShown: false }}>
      {() => (
        <ScreenWrapper>
          <SettingsStackNavigator />
        </ScreenWrapper>
      )}
    </Tab.Screen>
  </Tab.Navigator>
);
