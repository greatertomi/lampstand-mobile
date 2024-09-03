import React from 'react';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import {
  AboutLampstand,
  AccountSettings,
  Achievement,
  Appearance,
  AuthSuccess,
  BookContentList,
  BookDetails,
  BookList,
  ChangePassword,
  DeleteAccount,
  EditReadingGoal,
  FAQ,
  Faqs,
  Library,
  LoggedInModal,
  Login,
  Notification,
  NumberVerification,
  ProfileSettings,
  Reader,
  ResetPassword,
  SetPassword,
  Settings,
  SignUp,
  SMSVerification,
  Streaks
} from '../screens';

export interface ScreenType {
  name: keyof RootStackParamList;
  component: React.ComponentType;
  options?: NativeStackNavigationOptions;
}

export const screens: ScreenType[] = [
  { name: 'Login', component: Login, options: { headerShown: false } },
  { name: 'SignUp', component: SignUp, options: { headerShown: false } },
  { name: 'ResetPassword', component: ResetPassword, options: { headerShown: true } },
  { name: 'SMSVerification', component: SMSVerification, options: { headerShown: true } },
  { name: 'NumberVerification', component: NumberVerification, options: { headerShown: true } },
  { name: 'AuthSuccess', component: AuthSuccess, options: { headerShown: true } },
  { name: 'SetPassword', component: SetPassword, options: { headerShown: true } },
  { name: 'BookList', component: BookList },
  { name: 'Achievement', component: Achievement, options: { headerShown: true } },
  { name: 'Streaks', component: Streaks, options: { headerShown: true } },
  { name: 'LoggedInModal', component: LoggedInModal, options: { headerShown: true } },
  { name: 'Settings', component: Settings, options: { headerShown: true } },
  { name: 'BookDetails', component: BookDetails },
  { name: 'BookContentList', component: BookContentList },
  { name: 'AccountSettings', component: AccountSettings, options: { headerShown: true } },
  { name: 'ProfileSettings', component: ProfileSettings, options: { headerShown: true } },
  { name: 'ChangePassword', component: ChangePassword, options: { headerShown: true } },
  { name: 'NotificationSettings', component: Notification, options: { headerShown: true } },
  { name: 'DeleteAccount', component: DeleteAccount, options: { headerShown: true } },
  { name: 'FAQ', component: FAQ, options: { headerShown: true } },
  { name: 'Faqs', component: Faqs, options: { headerShown: true } },
  { name: 'Appearance', component: Appearance, options: { headerShown: true } },
  { name: 'AboutLampstand', component: AboutLampstand, options: { headerShown: true } },
  { name: 'EditReadingGoal', component: EditReadingGoal, options: { headerShown: true } }
];

export const protectedScreen: ScreenType[] = [
  { name: 'Library', component: Library, options: { headerShown: false } },
  { name: 'Reader', component: Reader }
];
