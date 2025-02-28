import { database } from '../database';

export const createMigrationTable = (): Promise<void> =>
  new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS migrations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          version INTEGER NOT NULL UNIQUE,
          applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });

export const getCurrentMigrationVersion = (): Promise<number> =>
  new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'SELECT MAX(version) AS version FROM migrations',
        [],
        (_, { rows }) => {
          const version = rows.item(0).version || 0;
          resolve(version);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });

export const insertMigrationVersion = (version: number): Promise<void> =>
  new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO migrations (version) VALUES (?)',
        [version],
        () => resolve(),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
