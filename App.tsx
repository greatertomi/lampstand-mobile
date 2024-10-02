import React from 'react';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from './styles';
import { Navigation } from './routes/Navigation';
import { useAuthVerification, useInitializeDatabase } from './hooks';
import Storybook from './.storybook';
import { logger } from './utils';

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [appIsReady, setAppIsReady] = React.useState(false);
  const [loaded] = useFonts({
    'plus-jakarta-sans': require('./assets/fonts/PlusJakartaSans-Regular.ttf'),
    'plus-jakarta-sans-italic': require('./assets/fonts/PlusJakartaSans-Italic.ttf')
  });
  const dbInitialized = useInitializeDatabase('books');
  useAuthVerification();

  React.useEffect(() => {
    const prepareApp = async () => {
      try {
        if (loaded && dbInitialized) {
          setAppIsReady(true);
        }
      } catch (error) {
        logger.warn(error);
      }
    };
    prepareApp();
  }, [loaded, dbInitialized]);

  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <ThemeProvider>
        {/* eslint-disable-next-line react/style-prop-object */}
        <StatusBar style="auto" />
        <Navigation />
      </ThemeProvider>
    </View>
  );
};

let AppEntryPoints = App;

if (Constants.expoConfig?.extra?.storybookEnabled === 'true') {
  AppEntryPoints = Storybook;
}

export default AppEntryPoints;
