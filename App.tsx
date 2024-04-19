import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Storybook from './.storybook';
import { ThemeProvider } from './styles';
import { Button } from './components';
import { SplashScreen } from './screens';

const App = () => {
  const [loaded] = useFonts({
    PlusJakarta: require('./assets/fonts/PlusJakartaSans-Regular.ttf'),
    PlusJakartaItalic: require('./assets/fonts/PlusJakartaSans-Italic.ttf')
  });

  if (!loaded) {
    return <SplashScreen />;
  }
  return (
    <View style={styles.container}>
      <ThemeProvider>
        {/* eslint-disable-next-line react/style-prop-object */}
        <StatusBar style="auto" />
        <Text>Open up App.tsx to start working on your app!</Text>
        <Button label="Press me!" />
      </ThemeProvider>
    </View>
  );
};

let AppEntryPoints = App;

if (Constants.expoConfig?.extra?.storybookEnabled === 'true') {
  AppEntryPoints = Storybook;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default AppEntryPoints;
