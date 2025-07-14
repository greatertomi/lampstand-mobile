import { useEffect, useState } from 'react';

import { getLocalStorageItem } from '../utils';

export const useExpoToken = () => {
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    (async () => {
      const storedToken = await getLocalStorageItem('expoPushToken');
      setToken(storedToken);
    })();
  }, []);

  return token;
};
