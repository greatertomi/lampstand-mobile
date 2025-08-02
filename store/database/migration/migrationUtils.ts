import { database } from '../database';

export const createMigrationTable = (): void => {
  try {
    database.execSync(
      `CREATE TABLE IF NOT EXISTS migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        version INTEGER NOT NULL UNIQUE,
        applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`
    );
  } catch (error) {
    throw new Error(`Failed to create migration table: ${error}`);
  }
};

export const getCurrentMigrationVersion = (): number => {
  try {
    const result = database.getFirstSync('SELECT MAX(version) AS version FROM migrations') as {
      version: number | null;
    } | null;
    return result?.version || 0;
  } catch (error) {
    throw new Error(`Failed to get current migration version: ${error}`);
  }
};

export const insertMigrationVersion = (version: number): void => {
  try {
    database.runSync('INSERT INTO migrations (version) VALUES (?)', [version]);
  } catch (error) {
    throw new Error(`Failed to insert migration version ${version}: ${error}`);
  }
};
