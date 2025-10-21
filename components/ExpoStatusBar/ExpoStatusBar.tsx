import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { useTheme } from '../../styles';

export const ExpoStatusBar: React.FC = () => {
  const { mode } = useTheme();

  return <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />;
};
