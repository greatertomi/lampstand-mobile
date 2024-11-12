/* eslint-disable no-restricted-syntax */
import { ReactNode } from 'react';

import { ThemeModeScheme } from '../../../../styles';

import { ThemeMode } from './ThemeMode';

export const useThemeChoices = (): { title: ThemeModeScheme; component: ReactNode }[] => {
  const secondaryBackground = '#f5f5f5';
  const background = '#fafafa';
  const tertiaryText = '#9b9b9b';
  const darkTertiaryText = '#9b9b9b';
  const text = '#111111';

  return [
    {
      title: ThemeModeScheme.Light,
      component: ThemeMode({
        topLeftDivBackground: secondaryBackground,
        topRightDivBackground: secondaryBackground,
        bottomRightDivBackground: background,
        bottomLeftDivBackground: background
      })
    },
    {
      title: ThemeModeScheme.Dark,
      component: ThemeMode({
        topLeftDivBackground: darkTertiaryText,
        topRightDivBackground: darkTertiaryText,
        bottomRightDivBackground: text,
        bottomLeftDivBackground: text
      })
    },
    {
      title: ThemeModeScheme.System,
      component: ThemeMode({
        topLeftDivBackground: secondaryBackground,
        topRightDivBackground: tertiaryText,
        bottomRightDivBackground: text,
        bottomLeftDivBackground: background
      })
    }
  ];
};
