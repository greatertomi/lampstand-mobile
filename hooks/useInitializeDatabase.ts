import { useEffect, useState } from 'react';

import { checkIfTableExists, createBooksTable } from '../store';
import { logger } from '../utils';

export const useInitializeDatabase = (tableName: string) => {
  const [isDBInitialized, setIsDBInitialized] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const canTableExists = await checkIfTableExists(tableName);
        if (!canTableExists) {
          await createBooksTable();
        }
        setIsDBInitialized(true);
      } catch (error) {
        logger.error(error);
      }
    })();
  }, [tableName]);
  return isDBInitialized;
};
