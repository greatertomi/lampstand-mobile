import { ReactNode } from 'react';

import { ThemeModeScheme, useTheme } from '../../../../styles';

import { ThemeMode } from './ThemeMode';

export const useThemeChoices = (): { title: ThemeModeScheme; component: ReactNode }[] => {
  const { theme } = useTheme();

  return [
    {
      title: ThemeModeScheme.Light,
      component: ThemeMode({
        topLeftDivBackground: theme.colors.secondaryBackground,
        topRightDivBackground: theme.colors.secondaryBackground,
        bottomRightDivBackground: theme.colors.background,
        bottomLeftDivBackground: theme.colors.background
      })
    },
    {
      title: ThemeModeScheme.Dark,
      component: ThemeMode({
        topLeftDivBackground: theme.colors.tertiaryText,
        topRightDivBackground: theme.colors.tertiaryText,
        bottomRightDivBackground: theme.colors.text,
        bottomLeftDivBackground: theme.colors.text
      })
    },
    {
      title: ThemeModeScheme.System,
      component: ThemeMode({
        topLeftDivBackground: theme.colors.secondaryBackground,
        topRightDivBackground: theme.colors.tertiaryText,
        bottomRightDivBackground: theme.colors.text,
        bottomLeftDivBackground: theme.colors.background
      })
    }
  ];
};
