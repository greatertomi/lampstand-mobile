import { useFonts } from 'expo-font';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import Storybook from './.storybook';
import { ThemeProvider } from './styles';
import { SplashScreen } from './screens';
import { Navigation } from './routes/Navigation';

const App = () => {
  const [loaded] = useFonts({
    'plus-jakarta-sans': require('./assets/fonts/PlusJakartaSans-Regular.ttf'),
    'plus-jakarta-sans-italic': require('./assets/fonts/PlusJakartaSans-Italic.ttf')
  });

  if (!loaded) {
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
