import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBarIcon } from './TabBarIcon';
import { tabScreens } from './screen-paths';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => (
  <Tab.Navigator screenOptions={{ tabBarStyle: styles.tabNavigator, tabBarShowLabel: false }}>
    {tabScreens.map((screen) => (
      <Tab.Screen
        key={screen.name}
        name={screen.name}
        component={screen.component}
        options={{
          headerShown: false,
          /* eslint-disable react/no-unstable-nested-components */
          tabBarIcon: (props) => <TabBarIcon icon={screen.icon} focused={props.focused} screenName={screen.tabName} />
        }}
      />
    ))}
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabNavigator: {
    height: 72,
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingBottom: 16,
    paddingTop: 14
  }
});
