import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';

import { RootStackParamList } from '../../routes';
import { Theme } from '../../styles';
import { ICON_SIZE } from '../../utils';

import { SettingsType } from './types';

export const generalData = (theme: Theme, isAuthenticated: boolean): SettingsType[] => [
  {
    id: 1,
    title: 'Account Settings',
    icon: <MaterialIcons name="manage-accounts" size={ICON_SIZE} color={theme.colors.text} />,
    variant: 'primary',
    link: 'AccountSettings'
  },
  ...(isAuthenticated
    ? [
        {
          id: 2,
          title: 'Login Settings',
          icon: <MaterialIcons name="lock" size={ICON_SIZE} color={theme.colors.text} />,
          variant: 'primary' as const,
          link: 'ChangePassword' as keyof RootStackParamList
        }
      ]
    : []),
  ...(isAuthenticated
    ? [
        {
          id: 3,
          title: 'Edit Reading Goal',
          icon: <MaterialIcons name="edit-note" size={ICON_SIZE} color={theme.colors.text} />,
          variant: 'primary' as const,
          link: 'EditReadingGoal' as keyof RootStackParamList
        }
      ]
    : []),
  // TODO: Uncomment this when working on analytics
  // {
  //   id: 5,
  //   title: 'Analytics',
  //   icon: <MaterialCommunityIcons name="google-analytics" size={ICON_SIZE} color={theme.colors.text} />,
  //   variant: 'primary' as const,
  //   link: 'Analytics' as keyof RootStackParamList
  // },
  {
    id: 4,
    title: 'FAQs & Support',
    icon: <MaterialIcons name="help" size={ICON_SIZE} color={theme.colors.text} />,
    variant: 'primary',
    link: 'FAQ'
  }
];

export const preferenceData = (theme: Theme, logoutPress: () => void, isAuthenticated: boolean): SettingsType[] => [
  {
    id: 1,
    title: 'Appearance',
    icon: <Ionicons name="star-sharp" size={ICON_SIZE} color={theme.colors.text} />,
    variant: 'primary',
    link: 'Appearance'
  },
  ...(isAuthenticated
    ? [
        {
          id: 2,
          title: 'Logout',
          icon: <Ionicons name="log-out" size={ICON_SIZE} color={theme.colors.primary} />,
          variant: 'secondary' as const,
          onPress: logoutPress
        }
      ]
    : [])
];

export const accountData = (isAuthenticated: boolean): SettingsType[] => [
  {
    id: 1,
    title: 'About Lampstand',
    variant: 'primary',
    link: 'AboutLampstand'
  },
  ...(isAuthenticated
    ? [
        {
          id: 2,
          title: 'Delete Account',
          variant: 'secondary' as const,
          link: 'DeleteAccount' as keyof RootStackParamList
        }
      ]
    : [])
];
