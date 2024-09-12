import { useEffect, useState } from 'react';
import { logger } from '../utils';
import { checkIfTableExists, createBooksTable } from '../store';

export const useInitializeDatabase = (tableName: string) => {
  const [dbInitialized, setDbInitialized] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const tableExists = await checkIfTableExists(tableName);
        if (!tableExists) {
          await createBooksTable();
        }
        setDbInitialized(true);
      } catch (error) {
        logger.error(error);
      }
    })();
  }, [tableName]);
  return dbInitialized;
};
