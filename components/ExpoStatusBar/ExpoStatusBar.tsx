import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';

import { useTheme } from '../../styles';

export const ExpoStatusBar: React.FC = () => {
  const { mode, theme } = useTheme();

  useEffect(() => {
    StatusBar.setBarStyle(mode === 'dark' ? 'light-content' : 'dark-content');
  }, [mode]);

  return <StatusBar animated backgroundColor={Platform.OS === 'android' ? theme.colors.background : undefined} />;
};
