/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { apiService, endpoints, parseHttpError } from '../api';
import { logger } from '../utils';

WebBrowser.maybeCompleteAuthSession();

interface UseGoogleAuthOptions {
  onSuccess: (data: any, token: string) => Promise<void>;
  onError: (message: string) => void;
  isAuthenticated?: boolean;
}

export const useGoogleAuth = ({ onSuccess, onError, isAuthenticated }: UseGoogleAuthOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const [request, googleResponse, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: Platform.select({
      android: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
      ios: process.env.EXPO_PUBLIC_IOS_CLIENT_ID
    })
  });

  useEffect(() => {
    (async () => {
      if (isAuthenticated || !googleResponse || isLoading) return;

      if (googleResponse.type === 'success') {
        setIsLoading(true);
        const idToken = googleResponse.authentication?.idToken;

        if (!idToken) {
          logger.error('Google OAuth success response is missing idToken.');
          onError('Authentication failed. Please try again.');
          setIsLoading(false);
          return;
        }

        try {
          const res = await apiService.post(endpoints.googleOauth, { token: idToken });
          const { data, token } = res.data;
          await onSuccess(data, token);
        } catch (error) {
          const errorMessage = parseHttpError(error).message;
          onError(errorMessage);
          logger.error('Google OAuth failed:', error);
        } finally {
          setIsLoading(false);
        }
      } else if (googleResponse.type === 'error') {
        logger.error('Google OAuth error:', googleResponse.error);
        onError('Google Sign-In failed. Please try again.');
      }
    })();
  }, [googleResponse, isAuthenticated, isLoading, onSuccess, onError]);

  return {
    promptAsync: () => {
      if (!isLoading && !isAuthenticated) {
        promptAsync();
      }
    },
    request,
    isLoading
  };
};
