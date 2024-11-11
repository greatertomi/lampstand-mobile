import { ReactNode } from 'react';

export interface ReadingSettingTypes {
  setting: string | ReactNode;
  title?: string | ReactNode;
  backgroundColor?: string;
  onPress?: () => void;
}
