import { useEffect, useState } from 'react';

import { checkIfTableExists } from '../store';
import { migrate, createMigrationTable, getCurrentMigrationVersion } from '../store/database/migration';
import { migrationList } from '../store/database/migration/migrationList';
import { logger } from '../utils';

export const useInitializeDatabase = (tableName: string) => {
  const [isDBInitialized, setIsDBInitialized] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        createMigrationTable();

        const currentVersion = getCurrentMigrationVersion();
        const latestVersion = Math.max(...migrationList.map((m) => m.version), 0);

        if (currentVersion < latestVersion) {
          logger.debug(
            `Your database version ${currentVersion} is behind latest version ${latestVersion}. Migrating...`
          );
          migrate(latestVersion);
        } else {
          logger.info('Database is up to date.');
        }

        const canTableExists = checkIfTableExists(tableName);
        if (!canTableExists) {
          logger.info(`Table ${tableName} does not exist, running latest migration`);
          migrate(currentVersion);
        }
        setIsDBInitialized(true);
      } catch (error) {
        logger.error(error);
      }
    })();
  }, [tableName]);
  return isDBInitialized;
};
