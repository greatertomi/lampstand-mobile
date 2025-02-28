import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import React from 'react';

import {
  AboutLampstand,
  AccountSettings,
  Achievement,
  Appearance,
  AuthSuccess,
  Bookmarks,
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
  ReadingPreference,
  ResetPassword,
  SetPassword,
  Settings,
  SignUp,
  SMSVerification,
  StreaksModal,
  TableOfContent,
  OTPVerification,
  OTPSuccess
} from '../screens';

import { RootStackParamList } from './types';

export interface ScreenType {
  name: keyof RootStackParamList;
  component: React.ComponentType;
  options?: NativeStackNavigationOptions;
}

export const screens: ScreenType[] = [
  { name: 'Login', component: Login, options: { headerShown: false } },
  { name: 'SignUp', component: SignUp, options: { headerShown: false } },
  { name: 'ResetPassword', component: ResetPassword, options: { headerShown: false } },
  { name: 'SMSVerification', component: SMSVerification, options: { headerShown: false } },
  { name: 'NumberVerification', component: NumberVerification, options: { headerShown: false } },
  { name: 'AuthSuccess', component: AuthSuccess, options: { headerShown: false } },
  { name: 'SetPassword', component: SetPassword, options: { headerShown: false } },
  { name: 'Achievement', component: Achievement, options: { headerShown: false } },
  { name: 'Streaks', component: StreaksModal, options: { headerShown: false } },
  { name: 'LoggedInModal', component: LoggedInModal, options: { headerShown: false } },
  { name: 'AccountSettings', component: AccountSettings, options: { headerShown: false } },
  { name: 'ProfileSettings', component: ProfileSettings, options: { headerShown: false } },
  { name: 'ChangePassword', component: ChangePassword, options: { headerShown: false } },
  { name: 'NotificationSettings', component: Notification, options: { headerShown: false } },
  { name: 'DeleteAccount', component: DeleteAccount, options: { headerShown: false } },
  { name: 'FAQ', component: FAQ, options: { headerShown: false } },
  { name: 'Faqs', component: Faqs, options: { headerShown: false } },
  { name: 'Appearance', component: Appearance, options: { headerShown: false } },
  { name: 'AboutLampstand', component: AboutLampstand, options: { headerShown: false } },
  { name: 'EditReadingGoal', component: EditReadingGoal, options: { headerShown: false } },
  { name: 'Reader', component: Reader, options: { headerShown: false } },
  { name: 'ReaderPreferences', component: ReadingPreference, options: { headerShown: false } },
  { name: 'Bookmarks', component: Bookmarks, options: { headerShown: false } },
  { name: 'TableOfContent', component: TableOfContent, options: { headerShown: false } },
  { name: 'Library', component: Library, options: { headerShown: false } },
  { name: 'TableOfContent', component: TableOfContent, options: { headerShown: false } },
  { name: 'OTPVerification', component: OTPVerification, options: { headerShown: false } },
  { name: 'OTPSuccess', component: OTPSuccess, options: { headerShown: false } },

];

export const tabScreens: ScreenType[] = [
  {
    name: 'MyBooks',
    component: Library,
    options: { headerShown: false }
  },
  {
    name: 'Settings',
    component: Settings,
    options: { headerShown: false }
  }
];
