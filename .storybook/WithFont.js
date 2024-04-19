import { Text, View } from 'react-native';
import { useFonts } from 'expo-font';

export const WithFont = (Story) => {
  const [loaded] = useFonts({
    PlusJakarta: require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
    PlusJakartaItalic: require('../assets/fonts/PlusJakartaSans-Italic.ttf')
  })

  if(!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading Fonts...</Text>
      </View>
    );
  }

  return <Story />
}
