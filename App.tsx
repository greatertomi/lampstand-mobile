import Constants from 'expo-constants';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { SWRConfig, SWRConfiguration } from 'swr';

import { AlertManager, DefaultToast } from './components';
import { BookProvider } from './context';
import { useAuthVerification, useInitializeDatabase } from './hooks';
import { ReaderProvider } from './package/epub-reader';
import { Navigation } from './routes/Navigation';
import { StorybookEntryPoint } from './StorybookEntryPoint';
import { ThemeProvider, utilities } from './styles';

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  const [hasFontsLoaded] = useFonts({
    'plus-jakarta-sans': require('./assets/fonts/PlusJakartaSans-Regular.ttf'),
    'plus-jakarta-sans-italic': require('./assets/fonts/PlusJakartaSans-Italic.ttf'),
    'plus-jakarta-sans-bold': require('./assets/fonts/PlusJakartaSans-SemiBold.ttf')
  });

  const didDBInitialized = useInitializeDatabase('books');
  useAuthVerification();

  useEffect(() => {
    if (hasFontsLoaded && didDBInitialized) {
      setIsAppReady(true);
    }
  }, [hasFontsLoaded, didDBInitialized]);

  const onLayoutRootView = useCallback(async () => {
    if (isAppReady) {
      await SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }

  const swrConfig: SWRConfiguration = {
    dedupingInterval: 10_000,
    shouldRetryOnError: false,
    revalidateOnFocus: true,
    revalidateOnReconnect: true
  };

  return (
    <ReaderProvider>
      <BookProvider>
        <View style={utilities.flex} onLayout={onLayoutRootView}>
          <ThemeProvider>
            <SWRConfig value={swrConfig}>
              <AlertManager />
              {/* eslint-disable-next-line react/style-prop-object */}
              <StatusBar style="auto" />
              <Navigation />
              <DefaultToast />
            </SWRConfig>
          </ThemeProvider>
        </View>
      </BookProvider>
    </ReaderProvider>
  );
};

let AppEntryPoints = App;
if (Constants.expoConfig?.extra?.storybookEnabled === 'true') {
  AppEntryPoints = StorybookEntryPoint;
}

export default AppEntryPoints;
