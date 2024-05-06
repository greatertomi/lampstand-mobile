import { useFonts } from 'expo-font';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Storybook from './.storybook';
import { ThemeProvider } from './styles';
import { SignUp, SplashScreen } from './screens';

const App = () => {
  const [loaded] = useFonts({
    'plus-jakarta-sans': require('./assets/fonts/PlusJakartaSans-Regular.ttf'),
    'plus-jakarta-sans-italic': require('./assets/fonts/PlusJakartaSans-Italic.ttf')
  });

  if (!loaded) {
    return <SplashScreen />;
  }
  return (
    <View style={styles.container}>
      <ThemeProvider>
        {/* eslint-disable-next-line react/style-prop-object */}
        <SignUp />
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
