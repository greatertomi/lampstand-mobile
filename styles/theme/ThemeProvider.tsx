import { ReactNode, useMemo, useState } from 'react';
import { ThemeModeScheme } from './types';
import { ThemeContext } from './context';
import { darkTheme, lightTheme } from './themes';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeModeScheme>(ThemeModeScheme.Light);

  const toggleTheme = () => {
    setMode((prev) => (prev === ThemeModeScheme.Dark ? ThemeModeScheme.Light : ThemeModeScheme.Dark));
  };

  const value = useMemo(
    () => ({
      mode,
      toggleTheme,
      theme: mode === ThemeModeScheme.Dark ? darkTheme : lightTheme
    }),
    [mode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
