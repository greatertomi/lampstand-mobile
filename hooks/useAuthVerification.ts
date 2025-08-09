import { useEffect } from 'react';
import useSWR from 'swr';

import { apiService, endpoints } from '../api';
import { useAuthState } from '../store';
import { User } from '../types';
import { getLocalStorageItem, logger, multiRemoveLocalStorageItem, setLocalStorageItem } from '../utils';

import { useNetworkState } from './useNetworkState';

export const useAuthVerification = () => {
  const { setIsAuthenticated, setToken, setUser } = useAuthState();
  const { isConnected } = useNetworkState();

  const { data, error } = useSWR(
    isConnected ? endpoints.currentUser : null,
    (url) => apiService.get(url).then((res) => res.data),
    {
      shouldRetryOnError: () => isConnected === true,
      errorRetryInterval: 5000
    }
  );

  useEffect(() => {
    (async () => {
      const token = await getLocalStorageItem('token');

      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      const setAuthState = (user: User | null, authToken: string | null, authenticated: boolean) => {
        setUser(user);
        setToken(authToken);
        setIsAuthenticated(authenticated);
      };

      const clearAuthState = async () => {
        await multiRemoveLocalStorageItem(['token', 'user']);
        setAuthState(null, null, false);
      };

      if (isConnected) {
        // Handle online authentication
        if (error) {
          logger.error('error verifying authentication', error);
          await clearAuthState();
        } else if (data) {
          await setLocalStorageItem('user', JSON.stringify(data));
          setAuthState(data, token, true);
        }
      } else {
        // Handle offline authentication
        const cachedUser = await getLocalStorageItem('user');

        if (cachedUser) {
          try {
            const user = JSON.parse(cachedUser);
            setAuthState(user, token, true);
            logger.info('Using cached user data in offline mode');
            return;
          } catch (parseError) {
            logger.error('Error parsing cached user data:', parseError);
          }
        }

        // Allow basic offline access with token only
        setAuthState(null, token, true);
        logger.info('Allowing offline access with token only');
      }
    })();
  }, [data, error, isConnected, setIsAuthenticated, setToken, setUser]);
};
