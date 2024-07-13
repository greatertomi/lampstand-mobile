import React from 'react';
import { Entypo, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SettingsType } from './types';
import { Theme } from '../../styles';

const ICON_SIZE = 24;

export const generalData = (theme: Theme): SettingsType[] => [
  {
    id: 1,
    title: 'Account Settings',
    icon: <MaterialIcons name="manage-accounts" size={ICON_SIZE} color={theme.colors.text} />,
    variant: 'primary',
    link: 'AccountSettings'
  },
  {
    id: 2,
    title: 'Change Password',
    icon: <MaterialIcons name="lock" size={ICON_SIZE} color={theme.colors.text} />,
    variant: 'primary',
    link: 'ChangePassword'
  },
  {
    id: 3,
    title: 'Help & Support',
    icon: <MaterialIcons name="help" size={ICON_SIZE} color={theme.colors.text} />,
    variant: 'primary'
  },
  {
    id: 4,
    title: 'Manage Subscription',
    icon: <MaterialIcons name="account-balance-wallet" size={ICON_SIZE} color={theme.colors.text} />,
    variant: 'primary'
  },
  {
    id: 5,
    title: 'Edit Reading Goal',
    icon: <MaterialIcons name="edit-note" size={ICON_SIZE} color={theme.colors.text} />,
    variant: 'primary',
    link: 'EditReadingGoal'
  },
  {
    id: 6,
    title: 'About Lampstand',
    icon: <MaterialIcons name="info" size={ICON_SIZE} color={theme.colors.text} />,
    variant: 'primary',
    link: 'AboutLampstand'
  }
];

export const preferenceData = (theme: Theme): SettingsType[] => [
  {
    id: 1,
    title: 'Notification',
    icon: <FontAwesome name="bell" size={ICON_SIZE} color={theme.colors.text} />,
    variant: 'primary',
    link: 'NotificationSettings'
  },
  {
    id: 2,
    title: 'Mode of reading',
    icon: <Ionicons name="reader" size={ICON_SIZE} color={theme.colors.text} />,
    variant: 'primary'
  },
  {
    id: 3,
    title: 'Appearance',
    icon: <Ionicons name="star-sharp" size={ICON_SIZE} color={theme.colors.text} />,
    variant: 'primary'
  },
  {
    id: 4,
    title: 'Logout',
    icon: <Ionicons name="log-out" size={ICON_SIZE} color={theme.colors.text} />,
    variant: 'secondary'
  }
];

export const accountData = (theme: Theme): SettingsType[] => [
  {
    id: 1,
    title: 'Linked Account',
    icon: <Entypo name="link" size={ICON_SIZE} color={theme.colors.text} />,
    variant: 'primary'
  },
  {
    id: 2,
    title: 'Accessibility',
    icon: <Ionicons name="accessibility" size={ICON_SIZE} color={theme.colors.text} />,
    variant: 'primary'
  },
  {
    id: 3,
    title: 'Activity History',
    icon: <MaterialIcons name="history" size={ICON_SIZE} color={theme.colors.text} />,
    variant: 'primary'
  },
  {
    id: 4,
    title: 'Delete Account',
    icon: <MaterialIcons name="delete" size={ICON_SIZE} color={theme.colors.text} />,
    variant: 'secondary',
    link: 'DeleteAccount'
  }
];
