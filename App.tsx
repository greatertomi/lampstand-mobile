import 'react-native-get-random-values';
import * as Sentry from '@sentry/react-native';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { SWRConfig, SWRConfiguration } from 'swr';

import { AlertManager, DefaultToast } from './components';
import { BookProvider } from './context';
import { useAuthVerification, useInitializeDatabase, usePushNotification } from './hooks';
import { ReaderProvider } from './package/epub-reader';
import { Navigation } from './routes/Navigation';
import { StorybookEntryPoint } from './StorybookEntryPoint';
import { ThemeProvider, utilities } from './styles';
import { logger } from './utils';

SplashScreen.preventAutoHideAsync();

if (process.env.EXPO_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
    sendDefaultPii: true,
    beforeSend: (event) => (process.env.APP_VARIANT === 'production' ? event : null)
  });
} else {
  logger.warn('Sentry DSN not provided - Sentry will not be initialized', process.env);
}

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);
  const { expoPushToken } = usePushNotification();
  const [isPushNotificationTimeout, setIsPushNotificationTimeout] = useState(false);

  const [hasFontsLoaded] = useFonts({
    'plus-jakarta-sans': require('./assets/fonts/PlusJakartaSans-Regular.ttf'),
    'plus-jakarta-sans-italic': require('./assets/fonts/PlusJakartaSans-Italic.ttf'),
    'plus-jakarta-sans-bold': require('./assets/fonts/PlusJakartaSans-SemiBold.ttf'),
    'urbanist-bold': require('./assets/fonts/Urbanist-Bold.ttf')
  });

  const didDBInitialized = useInitializeDatabase('books');
  useAuthVerification();

  // Set a timeout for push notification initialization to prevent indefinite waiting
  useEffect(() => {
    if (!Device.isDevice) {
      return () => {};
    }

    const timeout = setTimeout(() => {
      if (expoPushToken === undefined) {
        logger.warn('Push notification initialization timed out, proceeding with app startup');
        setIsPushNotificationTimeout(true);
      }
    }, 5000); // 5-second timeout

    return () => clearTimeout(timeout);
  }, [expoPushToken]);

  useEffect(() => {
    const isPushTokenReady = Device.isDevice ? expoPushToken !== undefined || isPushNotificationTimeout : true;

    const isReadyToRender = hasFontsLoaded && didDBInitialized && isPushTokenReady;
    if (isReadyToRender) {
      setIsAppReady(true);
    }
  }, [hasFontsLoaded, didDBInitialized, expoPushToken, isPushNotificationTimeout]);

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
    revalidateOnReconnect: true,
    errorRetryCount: 0,
    errorRetryInterval: 30_000,
    revalidateOnMount: true
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

export default Sentry.wrap(AppEntryPoints);
