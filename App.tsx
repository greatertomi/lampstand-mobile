import { useFonts } from 'expo-font';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
// eslint-disable-next-line import/namespace,import/default,import/no-named-as-default,import/no-named-as-default-member
import Storybook from './.storybook';
import { ThemeProvider, utilities } from './styles';
import { Navigation } from './routes/Navigation';
import { useAuthVerification, useInitializeDatabase } from './hooks';
import { DefaultToast } from './components/Toast';

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    'plus-jakarta-sans': require('./assets/fonts/PlusJakartaSans-Regular.ttf'),
    'plus-jakarta-sans-italic': require('./assets/fonts/PlusJakartaSans-Italic.ttf')
  });

  const dbInitialized = useInitializeDatabase('books');
  useAuthVerification();

  useEffect(() => {
    if (fontsLoaded && dbInitialized) {
      setAppIsReady(true);
    }
  }, [fontsLoaded, dbInitialized]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={utilities.flex} onLayout={onLayoutRootView}>
      <ThemeProvider>
        {/* eslint-disable-next-line react/style-prop-object */}
        <StatusBar style="auto" />
        <Navigation />
        <DefaultToast />
      </ThemeProvider>
    </View>
  );
};

let AppEntryPoints = App;
if (Constants.expoConfig?.extra?.storybookEnabled === 'true') {
  AppEntryPoints = Storybook;
}

export default AppEntryPoints;
