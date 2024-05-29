import { useFonts } from 'expo-font';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { ReaderProvider } from '@epubjs-react-native/core';
import { useEffect, useState } from 'react';
import Storybook from './.storybook';
import { ThemeProvider } from './styles';
import { Navigation } from './routes/Navigation';
import { createBooksTable } from './store/database';
import { SplashScreen } from './screens';

const App = () => {
  const [dbInitialized, setDbInitialized] = useState(false);
  const [loaded] = useFonts({
    'plus-jakarta-sans': require('./assets/fonts/PlusJakartaSans-Regular.ttf'),
    'plus-jakarta-sans-italic': require('./assets/fonts/PlusJakartaSans-Italic.ttf')
  });

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        await createBooksTable();
        setDbInitialized(true);
        console.log('Database initialized');
      } catch (error) {
        console.error(error);
      }
    };
    initializeDatabase();
  }, []);

  if (!loaded || !dbInitialized) {
    return <SplashScreen />;
  }

  return (
    <ThemeProvider>
      <ReaderProvider>
        {/* eslint-disable-next-line react/style-prop-object */}
        <StatusBar style="auto" />
        <Navigation />
      </ReaderProvider>
    </ThemeProvider>
  );
};

let AppEntryPoints = App;

if (Constants.expoConfig?.extra?.storybookEnabled === 'true') {
  AppEntryPoints = Storybook;
}

export default AppEntryPoints;
