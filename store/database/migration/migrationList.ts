import * as SQLite from 'expo-sqlite';

import { logger } from '../../../utils';
import { emitTableCreated, emitTableDropped } from '../events';

import { Migration } from './types';

export const migrationList: Migration[] = [
  {
    version: 2,
    up: (db: SQLite.SQLiteDatabase) => {
      try {
        db.execSync(
          `CREATE TABLE IF NOT EXISTS books (
          id STRING PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          mimeType TEXT NOT NULL,
          size INTEGER NOT NULL,
          author TEXT NOT NULL,
          filePath TEXT NOT NULL,
          description TEXT NOT NULL,
          isFinished NUMBER DEFAULT 0,
          cover TEXT,
          createdDateTime TEXT NOT NULL,
          state TEXT,
          UNIQUE(title, author)
        )`
        );
        logger.info('Table created successfully.');
        emitTableCreated();
      } catch (error) {
        logger.error('Failed to create table:', error);
        throw error;
      }
    },
    down: (db: SQLite.SQLiteDatabase) => {
      try {
        db.execSync('DROP TABLE IF EXISTS books');
        logger.info('Table dropped');
        emitTableDropped();
      } catch (error) {
        logger.error('Failed to drop table:', error);
        throw error;
      }
    }
  }
];
