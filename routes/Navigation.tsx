import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Login,
  SignUp,
  Library,
  BookList,
  ReadingScreen,
  ReadingHome,
  ResetPassword,
  AuthSuccess,
  SetPassword,
  Achievement,
  Streaks,
  LoggedInModal,
  BookProcessing
} from '../screens';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Library">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
      <Stack.Screen name="AuthSuccess" component={AuthSuccess} options={{ headerShown: false }} />
      <Stack.Screen name="Library" component={Library} options={{ headerShown: false }} />
      <Stack.Screen name="SetPassword" component={SetPassword} options={{ headerShown: false }} />
      <Stack.Screen name="ReadingHome" component={ReadingHome} />
      <Stack.Screen name="ReadingScreen" component={ReadingScreen} />
      <Stack.Screen name="BookList" component={BookList} />
      <Stack.Screen name="BookProcessing" component={BookProcessing} />
      <Stack.Screen name="Achievement" component={Achievement} options={{ headerShown: false }} />
      <Stack.Screen name="Streaks" component={Streaks} options={{ headerShown: false }} />
      <Stack.Screen name="LoggedInModal" component={LoggedInModal} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
);
