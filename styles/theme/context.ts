import { createContext } from 'react';

import { lightTheme } from './themes';
import { Theme, ThemeModeScheme } from './types';

interface ThemeContextValue {
  mode: ThemeModeScheme;
  setTheme: (title: ThemeModeScheme) => void;
  theme: Theme;
}

export const ThemeContext = createContext<ThemeContextValue>({
  mode: ThemeModeScheme.Light,
  setTheme: () => {},
  theme: lightTheme
});
