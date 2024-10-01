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
  StreaksModal
} from '../screens';
import { myBooks, settingIcon } from '../assets';

interface ScreenType {
  name: keyof RootStackParamList;
  component: React.ComponentType;
  options?: NativeStackNavigationOptions;
}

interface BottomNavType extends ScreenType {
  icon: string;
  tabName: string;
}

export const screens: ScreenType[] = [
  { name: 'Login', component: Login, options: { headerShown: false } },
  { name: 'SignUp', component: SignUp, options: { headerShown: false } },
  { name: 'ResetPassword', component: ResetPassword, options: { headerShown: false } },
  { name: 'SMSVerification', component: SMSVerification, options: { headerShown: false } },
  { name: 'NumberVerification', component: NumberVerification, options: { headerShown: false } },
  { name: 'AuthSuccess', component: AuthSuccess, options: { headerShown: false } },
  { name: 'SetPassword', component: SetPassword, options: { headerShown: false } },
  { name: 'BookList', component: BookList },
  { name: 'Achievement', component: Achievement, options: { headerShown: false } },
  { name: 'Streaks', component: StreaksModal, options: { headerShown: false } },
  { name: 'LoggedInModal', component: LoggedInModal, options: { headerShown: false } },
  { name: 'BookDetails', component: BookDetails },
  { name: 'BookContentList', component: BookContentList },
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
  { name: 'Reader', component: Reader }
];

export const tabScreens: BottomNavType[] = [
  {
    name: 'MyBooks',
    component: Library,
    options: { headerShown: false },
    icon: myBooks,
    tabName: 'My Books'
  },
  { name: 'Settings', component: Settings, options: { headerShown: false }, icon: settingIcon, tabName: 'Settings' }
];
