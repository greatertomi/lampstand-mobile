import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  const [request, googleResponse, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: Platform.select({
      android: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
      ios: process.env.EXPO_PUBLIC_IOS_CLIENT_ID
    })
  });
  return { promptAsync, request, googleResponse };
};
