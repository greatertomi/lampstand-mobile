import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screens } from '../screen-paths';
import { Settings } from '../../screens';

const SettingsStack = createNativeStackNavigator();

export const SettingsStackNavigator = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen name="SettingsStack" component={Settings} options={{ headerShown: false }} />
    {screens.map((screen) =>
      screen.name === 'MyBooks' ? null : (
        <SettingsStack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      )
    )}
  </SettingsStack.Navigator>
);
