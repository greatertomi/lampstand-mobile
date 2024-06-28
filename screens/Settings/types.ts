import { ReactNode } from 'react';

export interface SettingsType {
  id: number;
  title: string;
  icon: ReactNode;
  variant: 'primary' | 'secondary';
}
