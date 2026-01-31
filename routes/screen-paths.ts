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
  Library,
  Login,
  NumberVerification,
  ProfileSettings,
  Reader,
  ResetPassword,
  SetPassword,
  Settings,
  SignUp,
  SMSVerification,
  StreaksModal,
  TableOfContent,
  OTPVerification,
  OTPSuccess,
  Analytics,
  InTextComment,
  Highlights,
  SearchBook,
  SendComplaint,
  SendFeedback,
  SupportSuccess,
  Legal
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
  { name: 'AccountSettings', component: AccountSettings, options: { headerShown: false } },
  { name: 'ProfileSettings', component: ProfileSettings, options: { headerShown: false } },
  { name: 'ChangePassword', component: ChangePassword, options: { headerShown: false } },
  { name: 'DeleteAccount', component: DeleteAccount, options: { headerShown: false } },
  { name: 'FAQ', component: FAQ, options: { headerShown: false } },
  { name: 'Appearance', component: Appearance, options: { headerShown: false } },
  { name: 'AboutLampstand', component: AboutLampstand, options: { headerShown: false } },
  { name: 'EditReadingGoal', component: EditReadingGoal, options: { headerShown: false } },
  { name: 'Reader', component: Reader, options: { headerShown: false } },
  { name: 'Bookmarks', component: Bookmarks, options: { headerShown: false } },
  { name: 'TableOfContent', component: TableOfContent, options: { headerShown: false } },
  { name: 'OTPVerification', component: OTPVerification, options: { headerShown: false } },
  { name: 'OTPSuccess', component: OTPSuccess, options: { headerShown: false } },
  { name: 'Analytics', component: Analytics, options: { headerShown: false } },
  { name: 'Highlights', component: Highlights, options: { headerShown: false } },
  { name: 'SearchBook', component: SearchBook, options: { headerShown: false } },
  { name: 'InTextComment', component: InTextComment, options: { headerShown: false } },
  { name: 'SendComplaint', component: SendComplaint, options: { headerShown: false } },
  { name: 'SendFeedback', component: SendFeedback, options: { headerShown: false } },
  { name: 'SupportSuccess', component: SupportSuccess, options: { headerShown: false } },
  { name: 'Legal', component: Legal, options: { headerShown: false } }
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
