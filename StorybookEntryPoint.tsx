import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Storybook from './.storybook';

export const StorybookEntryPoint = () => {
  useEffect(() => {
    (async () => {
      await SplashScreen.hideAsync();
    })();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Storybook />
    </GestureHandlerRootView>
  );
};
