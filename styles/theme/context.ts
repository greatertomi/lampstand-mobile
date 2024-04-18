import { createContext } from 'react';
import { ThemeModeScheme } from './types';
import { darkTheme, lightTheme } from './themes';

interface ThemeContextValue {
  mode: ThemeModeScheme;
  toggleTheme: () => void;
  theme: typeof darkTheme | typeof lightTheme;
}

export const ThemeContext = createContext<ThemeContextValue>({
  mode: ThemeModeScheme.Light,
  toggleTheme: () => {},
  theme: lightTheme
});
