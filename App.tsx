import { useFonts } from 'expo-font';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import Storybook from './.storybook';
import { ThemeProvider } from './styles';
import { Navigation } from './routes/Navigation';
import { createBooksTable } from './store/database';
import { logger } from './utils';
import { SplashScreen } from './screens';

const App = () => {
  const [dbInitialized, setDbInitialized] = useState(false);
  const [loaded] = useFonts({
    'plus-jakarta-sans': require('./assets/fonts/PlusJakartaSans-Regular.ttf'),
    'plus-jakarta-sans-italic': require('./assets/fonts/PlusJakartaSans-Italic.ttf')
  });

  useEffect(() => {
    (async () => {
      try {
        // await dropBooksTable();
        await createBooksTable();
        setDbInitialized(true);
      } catch (error) {
        logger.error(error);
      }
    })();
  }, []);

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
