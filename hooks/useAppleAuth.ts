import * as AppleAuthentication from 'expo-apple-authentication';
import { randomUUID } from 'expo-crypto';
import { useState, useCallback } from 'react';

import { logger } from '../utils';

export const useAppleAuth = () => {
  const [appleResponse, setAppleResponse] = useState<AppleAuthentication.AppleAuthenticationCredential | null>(null);

  const signInWithApple = useCallback(async () => {
    const rawNonce = randomUUID();
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ],
        nonce: rawNonce
      });

      setAppleResponse(credential);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.code === 'ERR_CANCELED') {
        logger.info('Apple login cancelled');
      } else {
        logger.error('Apple login failed', e);
      }
    }
  }, []);

  return { signInWithApple, appleResponse };
};
