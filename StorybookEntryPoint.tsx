import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import Storybook from './.storybook';

export const StorybookEntryPoint = () => {
  useEffect(() => {
    (async () => {
      await SplashScreen.hideAsync();
    })();
  }, []);
  return <Storybook />;
};
