import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../styles';
import { BOTTOM_TAB_HEIGHT } from '../utils';

import { CustomBottomTab } from './CustomBottomTab';
import { tabScreens } from './screen-paths';

const Tab = createBottomTabNavigator();
const CustomBottomTabs = (props: BottomTabBarProps) => <CustomBottomTab {...props} />;

export const BottomTabNavigator = () => {
  const { theme } = useTheme();
  const { bottom } = useSafeAreaInsets();

  return (
    <Tab.Navigator
      tabBar={CustomBottomTabs}
      screenOptions={{ tabBarShowLabel: false, headerShown: false }}
      sceneContainerStyle={{
        paddingBottom: BOTTOM_TAB_HEIGHT + bottom,
        backgroundColor: theme.colors.background
      }}
    >
      {tabScreens.map((screen) => (
        <Tab.Screen key={screen.name} name={screen.name} component={screen.component} />
      ))}
    </Tab.Navigator>
  );
};
