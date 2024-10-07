import { useEffect } from 'react';
import useSWR from 'swr';
import { useAuthState } from '../store';
import { apiService, endpoints } from '../api';
import { getLocalStorageItem, logger, multiRemoveLocalStorageItem } from '../utils';

export const useAuthVerification = () => {
  const { setIsAuthenticated, setToken, setUser } = useAuthState();
  const { data, error } = useSWR(endpoints.currentUser, (url) => apiService.get(url).then((res) => res.data));

  useEffect(() => {
    (async () => {
      const token = await getLocalStorageItem('token');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      if (error) {
        logger.error('error verifying authentication', error);
        await multiRemoveLocalStorageItem(['token', 'user']);
        setIsAuthenticated(false);
        setToken(null);
        setUser(null);
        // Todo: navigate to login screen if not authenticated
      } else if (data) {
        setUser(data);
        setToken(token);
        setIsAuthenticated(true);
      }
    })();
  }, [data, error, setIsAuthenticated, setToken, setUser]);
};
