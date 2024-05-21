import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Library, Login, SetPassword, SignUp } from '../screens';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="SetPassword">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen name="Library" component={Library} options={{ headerShown: false }} />
      <Stack.Screen name="SetPassword" component={SetPassword} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
);
