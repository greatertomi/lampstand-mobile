import { createContext } from 'react';

import { lightTheme } from './themes';
import { Theme, ThemeModeScheme } from './types';

interface ThemeContextValue {
  mode: ThemeModeScheme;
  toggleTheme: (title: ThemeModeScheme) => void;
  theme: Theme;
}

export const ThemeContext = createContext<ThemeContextValue>({
  mode: ThemeModeScheme.Light,
  toggleTheme: () => {},
  theme: lightTheme
});
