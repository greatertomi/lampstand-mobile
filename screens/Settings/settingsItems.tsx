import React from 'react';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SettingsType } from './types';
import { Theme } from '../../styles';

const ICON_SIZE = 24;

export const generalData = (theme: Theme): SettingsType[] => [
  {
    id: 1,
    title: 'Account Settings',
    icon: <MaterialIcons name="manage-accounts" size={ICON_SIZE} color={theme.colors.text} />,
    variant: 'primary'
  },
  {
    id: 2,
    title: 'Change Password',
    icon: <MaterialIcons name="lock" size={ICON_SIZE} color={theme.colors.text} />,
    variant: 'primary'
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
    variant: 'primary'
  },
  {
    id: 6,
    title: 'Term of Use',
    icon: <MaterialIcons name="info" size={ICON_SIZE} color={theme.colors.text} />,
    variant: 'primary'
  }
];

export const preferenceData = (theme: Theme): SettingsType[] => [
  {
    id: 1,
    title: 'Notification',
    icon: <FontAwesome name="bell" size={ICON_SIZE} color={theme.colors.text} />,
    variant: 'primary'
  },
  {
    id: 2,
    title: 'Change Password',
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
    variant: 'primary'
  }
];
