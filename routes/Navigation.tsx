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
  Reader,
  AccountSettings,
  ProfileSettings,
  ChangePassword,
  Notification,
  Appearance,
  FAQ,
  Faqs,
  AboutLampstand,
  DeleteAccount,
  EditReadingGoal,
  NumberVerification,
  SMSVerification
} from '../screens';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="ReadingHome">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
      <Stack.Screen name="SMSVerification" component={SMSVerification} options={{ headerShown: false }} />
      <Stack.Screen name="NumberVerification" component={NumberVerification} options={{ headerShown: false }} />
      <Stack.Screen name="AuthSuccess" component={AuthSuccess} options={{ headerShown: false }} />
      <Stack.Screen name="Library" component={Library} options={{ headerShown: false }} />
      <Stack.Screen name="SetPassword" component={SetPassword} options={{ headerShown: false }} />
      <Stack.Screen name="ReadingHome" component={ReadingHome} />
      <Stack.Screen name="BookList" component={BookList} />
      <Stack.Screen name="BookProcessing" component={BookProcessing} />
      <Stack.Screen name="Achievement" component={Achievement} options={{ headerShown: false }} />
      <Stack.Screen name="Streaks" component={Streaks} options={{ headerShown: false }} />
      <Stack.Screen name="LoggedInModal" component={LoggedInModal} options={{ headerShown: false }} />
      <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
      <Stack.Screen name="BookDetails" component={BookDetails} />
      <Stack.Screen name="Reader" component={Reader} />
      <Stack.Screen name="BookContentList" component={BookContentList} />
      <Stack.Screen name="AccountSettings" component={AccountSettings} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettings} options={{ headerShown: false }} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
      <Stack.Screen name="NotificationSettings" component={Notification} options={{ headerShown: false }} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccount} options={{ headerShown: false }} />
      <Stack.Screen name="FAQ" component={FAQ} options={{ headerShown: false }} />
      <Stack.Screen name="Faqs" component={Faqs} options={{ headerShown: false }} />
      <Stack.Screen name="Appearance" component={Appearance} options={{ headerShown: false }} />
      <Stack.Screen name="AboutLampstand" component={AboutLampstand} options={{ headerShown: false }} />
      <Stack.Screen name="EditReadingGoal" component={EditReadingGoal} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
);
