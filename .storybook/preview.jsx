import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { WithFont } from './WithFont';

/** @type{import("@storybook/react").Preview} */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  },

  decorators: [
    WithFont,
    (Story, { parameters }) => (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: parameters.noBackground === true ? undefined : '#f5f5f5',
            padding: 8
          }}
        >
          <Story />
        </View>
      </GestureHandlerRootView>
    )
  ]
};

export default preview;
