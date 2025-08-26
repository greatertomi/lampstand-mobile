/* eslint-disable @typescript-eslint/no-explicit-any */
import * as AppleAuthentication from 'expo-apple-authentication';
import { randomUUID } from 'expo-crypto';
import { useState, useCallback } from 'react';

import { apiService, endpoints, parseHttpError } from '../api';
import { logger } from '../utils';

interface UseAppleAuthOptions {
  onSuccess: (data: any, token: string) => Promise<void>;
  onError: (message: string) => void;
  isAuthenticated?: boolean;
}

export const useAppleAuth = ({ isAuthenticated, onSuccess, onError }: UseAppleAuthOptions) => {
  const [isLoading, setIsLoading] = useState(false);

  const signInWithApple = useCallback(async () => {
    if (isAuthenticated) return;

    const rawNonce = randomUUID();
    try {
      setIsLoading(true);
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ],
        nonce: rawNonce
      });

      if (!credential.identityToken) {
        logger.error('Apple Sign-In failed - no identity token returned');
        onError('Apple Sign-In failed - no identity token returned');
        return;
      }

      try {
        const payload = {
          token: credential.identityToken,
          nonce: rawNonce,
          ...(credential.fullName && {
            fullName: `${credential.fullName.givenName ?? ''} ${credential.fullName.familyName ?? ''}`.trim()
          })
        };

        const res = await apiService.post(endpoints.appleOauth, payload);
        logger.debug('Apple OAuth response:', res.data);
        const { data, token } = res.data;
        await onSuccess(data, token);
      } catch (error) {
        const errorMessage = parseHttpError(error).message;
        onError(errorMessage);
        logger.error('Apple OAuth backend failed:', error);
      }
    } catch (e: any) {
      if (e.code === 'ERR_CANCELED') {
        logger.info('Apple login cancelled');
      } else {
        logger.error('Apple login failed', e);
        onError('Apple login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, onError, onSuccess]);

  return { signInWithApple, isLoading };
};
