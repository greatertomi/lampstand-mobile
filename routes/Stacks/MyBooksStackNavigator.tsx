import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screens } from '../screen-paths';
import { Library } from '../../screens';

const MyBooksStack = createNativeStackNavigator();

export const MyBooksStackNavigator = () => (
  <MyBooksStack.Navigator>
    <MyBooksStack.Screen name="Library" component={Library} options={{ headerShown: false }} />
    {screens.map((screen) =>
      screen.name === 'Settings' ? null : (
        <MyBooksStack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      )
    )}
  </MyBooksStack.Navigator>
);
