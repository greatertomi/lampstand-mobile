import * as SQLite from 'expo-sqlite';

import { logger } from '../../../utils';
import { convertAbsoluteToRelative, isRelativePath } from '../../../utils/path-migration';
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
  },
  {
    version: 3,
    up: async (db: SQLite.SQLiteDatabase) => {
      try {
        logger.info('Starting migration to convert absolute file paths to relative paths');

        // Get all books with their current file paths
        const books = db.getAllSync('SELECT id, filePath FROM books') as { id: string; filePath: string }[];

        await Promise.all(
          books.map(async (book) => {
            if (isRelativePath(book.filePath)) {
              logger.debug(`Book ${book.id} already has relative path: ${book.filePath}`);
              return;
            }

            try {
              const relativePath = await convertAbsoluteToRelative(book.filePath);
              if (relativePath) {
                db.runSync('UPDATE books SET filePath = ? WHERE id = ?', [relativePath, book.id]);
                logger.info(`Converted path for book ${book.id}: ${book.filePath} -> ${relativePath}`);
              } else {
                logger.warn(`Failed to convert path for book ${book.id}: ${book.filePath}`);
              }
            } catch (error) {
              logger.error(`Error converting path for book ${book.id}:`, error);
            }
          })
        );

        logger.info('Completed migration to convert file paths to relative paths');
      } catch (error) {
        logger.error('Failed to migrate file paths:', error);
        throw error;
      }
    },
    down: () => {
      logger.warn('Down migration for path conversion is not supported');
      throw new Error('Down migration for path conversion is not supported');
    }
  }
];
