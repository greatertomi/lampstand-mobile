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
      // eslint-disable-next-line no-await-in-loop
      await new Promise<void>((resolve, reject) => {
        database.transaction(
          (tx) => {
            migration.up(tx);
          },
          (error) => {
            logger.debug(`Migration ${migration.version} failed`, error);
            reject(error);
          },
          async () => {
            try {
              if (migration.version > currentMigrationVersion) {
                await insertMigrationVersion(migration.version);
              }
              resolve();
            } catch (error) {
              reject(error);
            }
          }
        );
      });
    }

    logger.info('Database operations completed successfully');
  } catch (error) {
    logger.debug('Migration failed', error);
    try {
      await migrate(currentMigrationVersion);
      logger.debug('Rollback successful');
    } catch (err) {
      logger.debug('Rollback failed', err);
    }
  }
};
