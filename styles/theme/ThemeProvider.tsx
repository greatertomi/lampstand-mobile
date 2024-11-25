import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { Appearance, useColorScheme, StatusBar } from 'react-native';

import { ThemeContext } from './context';
import { darkTheme, lightTheme } from './themes';
import { ThemeModeScheme } from './types';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeModeScheme>(ThemeModeScheme.Light);
  const systemTheme = useColorScheme();

  const toggleTheme = useCallback(
    async (newMode?: ThemeModeScheme) => {
      const selectedMode = newMode ?? (mode === ThemeModeScheme.Dark ? ThemeModeScheme.Light : ThemeModeScheme.Dark);
      setMode(selectedMode);
      await AsyncStorage.setItem('themeMode', selectedMode);
    },
    [mode]
  );

  const theme = useMemo(() => {
    if (mode === ThemeModeScheme.System) {
      return systemTheme === 'dark' ? darkTheme : lightTheme;
    }
    return mode === ThemeModeScheme.Dark ? darkTheme : lightTheme;
  }, [mode, systemTheme]);

  const value = useMemo(
    () => ({
      mode,
      toggleTheme,
      theme
    }),
    [mode, theme, toggleTheme]
  );

  useEffect(() => {
    (async () => {
      const previousMode = await AsyncStorage.getItem('themeMode');
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

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
