import Constants from 'expo-constants';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AlertManager, DefaultToast } from './components';
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

  return (
    <ReaderProvider>
      <View style={utilities.flex} onLayout={onLayoutRootView}>
        <GestureHandlerRootView style={utilities.flex}>
          <ThemeProvider>
            <AlertManager />
            {/* eslint-disable-next-line react/style-prop-object */}
            <StatusBar style="auto" />
            <Navigation />
            <DefaultToast />
          </ThemeProvider>
        </GestureHandlerRootView>
      </View>
    </ReaderProvider>
  );
};

let AppEntryPoints = App;
if (Constants.expoConfig?.extra?.storybookEnabled === 'true') {
  AppEntryPoints = StorybookEntryPoint;
}

export default AppEntryPoints;
