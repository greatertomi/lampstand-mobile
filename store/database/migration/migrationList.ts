import * as SQLite from 'expo-sqlite/legacy';

import { logger } from '../../../utils';
import { emitTableCreated, emitTableDropped } from '../events';

import { Migration } from './types';

export const migrationList: Migration[] = [
  {
    version: 2,
    up: async (tx: SQLite.SQLTransaction) => {
      await new Promise<void>((resolve, reject) => {
        tx.executeSql(
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
        )`,
          [],
          () => {
            logger.info('Table created successfully.');
            emitTableCreated();
            resolve();
          },
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    },
    down: async (tx: SQLite.SQLTransaction) => {
      await new Promise<void>((resolve, reject) => {
        tx.executeSql(
          'DROP TABLE IF EXISTS books',
          [],
          () => {
            logger.info('Table dropped');
            emitTableDropped();
            resolve();
          },
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    }
  }
];
