import { ReactNode } from 'react';

import { RootStackParamList } from '../../routes';

export interface SettingsType {
  id?: number;
  title: string;
  defaultState?: string;
  icon?: ReactNode;
  variant?: 'primary' | 'secondary';
  link?: keyof RootStackParamList | undefined;
  onPress?: () => void;
}
