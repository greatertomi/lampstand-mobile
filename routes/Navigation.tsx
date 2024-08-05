import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Login,
  SignUp,
  Library,
  BookList,
  ReadingHome,
  ResetPassword,
  AuthSuccess,
  SetPassword,
  Achievement,
  Streaks,
  LoggedInModal,
  Settings,
  BookDetails,
  BookContentList,
  Reader
} from '../screens';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="ReadingHome">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
      <Stack.Screen name="AuthSuccess" component={AuthSuccess} options={{ headerShown: false }} />
      <Stack.Screen name="Library" component={Library} options={{ headerShown: false }} />
      <Stack.Screen name="SetPassword" component={SetPassword} options={{ headerShown: false }} />
      <Stack.Screen name="ReadingHome" component={ReadingHome} />
      <Stack.Screen name="BookList" component={BookList} />
      <Stack.Screen name="Achievement" component={Achievement} options={{ headerShown: false }} />
      <Stack.Screen name="Streaks" component={Streaks} options={{ headerShown: false }} />
      <Stack.Screen name="LoggedInModal" component={LoggedInModal} options={{ headerShown: false }} />
      <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
      <Stack.Screen name="BookDetails" component={BookDetails} />
      <Stack.Screen name="Reader" component={Reader} />
      <Stack.Screen name="BookContentList" component={BookContentList} />
    </Stack.Navigator>
  </NavigationContainer>
);
