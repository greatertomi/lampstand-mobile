import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { Appearance, useColorScheme, StatusBar } from 'react-native';

import { ThemeContext } from './context';
import { darkTheme, lightTheme } from './themes';
import { ThemeModeScheme } from './types';
import { getLocalStorageItem, setLocalStorageItem } from '../../utils';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeModeScheme>(ThemeModeScheme.Light);
  const systemTheme = useColorScheme();

  useEffect(() => {
    (async () => {
      const previousMode = await getLocalStorageItem('themeMode');
      if (previousMode) {
        setMode(previousMode as ThemeModeScheme);
      }

      const listener = Appearance.addChangeListener(({ colorScheme }) => {
        if (mode === ThemeModeScheme.System) {
          setMode(colorScheme === 'dark' ? ThemeModeScheme.Dark : ThemeModeScheme.Light);
        }
      });
      StatusBar.setBarStyle(mode === ThemeModeScheme.Dark ? 'light-content' : 'dark-content', true);

      return () => listener.remove();
    })();
  }, [mode]);

  const setTheme = useCallback(async (newMode: ThemeModeScheme) => {
    setMode(newMode);
    await setLocalStorageItem('themeMode', newMode);
  }, []);

  const theme = useMemo(() => {
    if (mode === ThemeModeScheme.System) {
      return systemTheme === 'dark' ? darkTheme : lightTheme;
    }
    return mode === ThemeModeScheme.Dark ? darkTheme : lightTheme;
  }, [mode, systemTheme]);

  const value = useMemo(
    () => ({
      mode,
      setTheme,
      theme
    }),
    [mode, theme, setTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
