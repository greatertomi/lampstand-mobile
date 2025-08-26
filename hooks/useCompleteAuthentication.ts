import { NavigationProp } from '@react-navigation/native';
import { mutate } from 'swr';

import { endpoints } from '../api';
import { RootStackParamList } from '../routes';
import { useAuthState, useBookSyncState, useNotificationState } from '../store';
import { User } from '../types';
import { logger, setLocalStorageItem } from '../utils';

export const useCompleteAuthentication = (navigation: NavigationProp<RootStackParamList>) => {
  const { setToken, setUser, setIsAuthenticated } = useAuthState();
  const { setShouldSync } = useBookSyncState();
  const { addNotification } = useNotificationState();

  return async (data: User, token: string) => {
    try {
      await setLocalStorageItem('user', JSON.stringify(data));
      await setLocalStorageItem('token', token);
      setToken(token);
      setUser(data);
      setIsAuthenticated(true);
      setShouldSync(true);

      try {
        await mutate(endpoints.getBooks);
      } catch (booksError) {
        logger.warn('Failed to fetch books after login:', booksError);
      }

      navigation.navigate('MyBooks');
    } catch (error) {
      logger.error('Error during post-login setup:', error);
      addNotification({
        id: Date.now().toString(),
        message: 'Something went wrong after login',
        type: 'error'
      });
    }
  };
};
