import { Text, View } from 'react-native';
import { useFonts } from 'expo-font';

export const WithFont = (Story) => {
  const [loaded] = useFonts({
    'plus-jakarta-sans': require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
    'plus-jakarta-sans-italic': require('../assets/fonts/PlusJakartaSans-Italic.ttf')
  });

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading Fonts...</Text>
      </View>
    );
  }

  return <Story />;
};
