import { useFonts } from 'expo-font';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Storybook from './.storybook';
import { ThemeProvider } from './styles';
import { Navigation } from './routes/Navigation';
import { SplashScreen } from './screens';
import { useAuthVerification, useInitializeDatabase } from './hooks';

const App = () => {
  const [loaded] = useFonts({
    'plus-jakarta-sans': require('./assets/fonts/PlusJakartaSans-Regular.ttf'),
    'plus-jakarta-sans-italic': require('./assets/fonts/PlusJakartaSans-Italic.ttf')
  });
  const dbInitialized = useInitializeDatabase('books');
  useAuthVerification();

  if (!loaded || !dbInitialized) {
    return <SplashScreen />;
  }

  return (
    <ThemeProvider>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="auto" />
      <Navigation />
    </ThemeProvider>
  );
};

let AppEntryPoints = App;

if (Constants.expoConfig?.extra?.storybookEnabled === 'true') {
  AppEntryPoints = Storybook;
}

export default AppEntryPoints;
