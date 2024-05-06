import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, SignUp } from '../screens';
import { routeNames } from './types';

const Stack = createNativeStackNavigator();

export const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName={routeNames.login}>
      <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="signUp" component={SignUp} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
);
