import { createContext } from 'react';
import { Theme, ThemeModeScheme } from './types';
import { lightTheme } from './themes';

interface ThemeContextValue {
  mode: ThemeModeScheme;
  toggleTheme: () => void;
  theme: Theme;
}

export const ThemeContext = createContext<ThemeContextValue>({
  mode: ThemeModeScheme.Light,
  toggleTheme: () => {},
  theme: lightTheme
});
