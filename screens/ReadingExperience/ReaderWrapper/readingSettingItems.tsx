import { AntDesign } from '@expo/vector-icons';
import { ReactNode } from 'react';
import { SvgXml } from 'react-native-svg';

import { flipDevice } from '../../../assets';
import { Theme } from '../../../styles';

import { READING_PRESET } from './types';

export const getReadingXpActions = (theme: Theme): { setting: ReactNode }[] => [
  {
    setting: <AntDesign name="search1" size={24} color={theme.colors.text} />
  },
  {
    setting: <SvgXml xml={flipDevice(theme.colors.text)} />
  }
];

export const readingPresetOptions = [
  {
    presetType: READING_PRESET.ORIGINAL,
    setting: 'Aa'
  },
  {
    presetType: READING_PRESET.PAPER,
    setting: 'Aa'
  },
  {
    presetType: READING_PRESET.QUIET,
    setting: 'Aa'
  }
];
