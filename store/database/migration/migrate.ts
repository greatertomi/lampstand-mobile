import { logger } from '../../../utils';
import { database } from '../database';

import { migrationList } from './migrationList';
import { createMigrationTable, getCurrentMigrationVersion, insertMigrationVersion } from './migrationUtils';

export const migrate = async (targetVersion: number): Promise<void> => {
  const currentMigrationVersion = await getCurrentMigrationVersion();
  const latestMigrationVersion = Math.max(...migrationList.map((m) => m.version));
  const migrationVersionToImplement = targetVersion || latestMigrationVersion;

  try {
    await createMigrationTable();

    if (migrationVersionToImplement > latestMigrationVersion) {
      logger.error(`Version ${migrationVersionToImplement} is higher than the latest available`);
      return;
    }

    if (currentMigrationVersion === migrationVersionToImplement) {
      logger.info('Database is up to date');
      return;
    }

    const relevantMigrations = migrationList
      .filter((m) => m.version > currentMigrationVersion && m.version <= migrationVersionToImplement)
      .sort((a, b) => a.version - b.version);

    for (const migration of relevantMigrations) {
      database.transaction(async (tx) => {
        await migration.up(tx);
        await insertMigrationVersion(migration.version);
      });
      logger.info(`Applying migration ${migration.version}`);
    }

    logger.info(`Database upgraded successfully to version ${migrationVersionToImplement}`);
  } catch (error) {
    logger.error('Migration failed', error);
    try {
      await migrate(currentMigrationVersion);
      logger.debug('Rollback successful');
    } catch (err) {
      logger.error('Rollback failed', err);
    }
  }
};
