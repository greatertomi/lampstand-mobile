import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { protectedScreen, screens } from './screen-paths';
import { useAuthState } from '../store';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  const { token, user } = useAuthState();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={token && user ? 'Library' : 'SignUp'}>
        {token && user ? (
          <>
            {protectedScreen.map((screen) => (
              <Stack.Screen
                key={screen.name}
                name={screen.name}
                component={screen.component}
                options={screen.options}
              />
            ))}
          </>
        ) : (
          <>
            {screens.map((screen) => (
              <Stack.Screen
                key={screen.name}
                name={screen.name}
                component={screen.component}
                options={screen.options}
              />
            ))}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
