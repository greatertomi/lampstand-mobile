import { ReactNode } from 'react';

export interface ContextMenuType {
  label: string;
  icon: ReactNode;
  onPress?: () => void;
}
