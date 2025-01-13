import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// eslint-disable-next-line import/namespace,import/default,import/no-named-as-default,import/no-named-as-default-member
import Storybook from './.storybook';

export const StorybookEntryPoint = () => {
  useEffect(() => {
    (async () => {
      await SplashScreen.hideAsync();
    })();
  }, []);
  return <Storybook />;
};
