import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Library, Login, SignUp } from '../screens';
import { routeNames } from './types';

const Stack = createNativeStackNavigator();

export const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName={routeNames.Library}>
      <Stack.Screen name={routeNames.Login} component={Login} options={{ headerShown: false }} />
      <Stack.Screen name={routeNames.SignUp} component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen name={routeNames.Library} component={Library} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
);
