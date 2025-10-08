import { logger } from '../../../utils';
import { database } from '../database';

import { migrationList } from './migrationList';
import { createMigrationTable, getCurrentMigrationVersion, insertMigrationVersion } from './migrationUtils';

export const migrate = async (targetVersion?: number): Promise<void> => {
  try {
    createMigrationTable();

    const currentMigrationVersion = getCurrentMigrationVersion();
    const latestMigrationVersion = Math.max(...migrationList.map((m) => m.version));
    const migrationVersionToImplement = targetVersion || latestMigrationVersion;

    if (migrationVersionToImplement > latestMigrationVersion) {
      logger.debug(`Version ${migrationVersionToImplement} is higher than the latest available`);
    }

    let relevantMigrations;

    if (currentMigrationVersion === migrationVersionToImplement) {
      relevantMigrations = migrationList
        .filter((m) => m.version === currentMigrationVersion)
        .sort((a, b) => a.version - b.version);

      logger.info(`Re-applying current migration version ${currentMigrationVersion}`);
    } else {
      relevantMigrations = migrationList
        .filter((m) => m.version > currentMigrationVersion && m.version <= migrationVersionToImplement)
        .sort((a, b) => a.version - b.version);

      logger.info(`Upgrading from version ${currentMigrationVersion} to ${migrationVersionToImplement}`);
    }

    for (const migration of relevantMigrations) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await migration.up(database);
        if (migration.version > currentMigrationVersion) {
          insertMigrationVersion(migration.version);
        }
      } catch (error) {
        logger.error(`Migration ${migration.version} failed:`, error);
        throw error;
      }
    }

    logger.info('Database operations completed successfully');
  } catch (error) {
    logger.error('Migration failed:', error);
    throw error;
  }
};
