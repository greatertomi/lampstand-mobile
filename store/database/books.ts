import * as SQLite from 'expo-sqlite/legacy';

import { logger } from '../../utils';

import { UploadedBook } from './types';

const database = SQLite.openDatabase('people.db');

export const checkIfTableExists = (tableName: string): Promise<boolean> =>
  new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `PRAGMA table_info(${tableName})`,
        [],
        (_, { rows }) => {
          resolve(rows.length > 0);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });

export const createBooksTable = (): Promise<void> =>
  new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS books (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          mimeType TEXT NOT NULL,
          size INTEGER NOT NULL,
          author TEXT NOT NULL,
          filePath TEXT NOT NULL,
          progress NUMBER DEFAULT 0,
          description TEXT NOT NULL,
          cover TEXT,
          createdDateTime TEXT NOT NULL,
          state TEXT,
          UNIQUE(title, author)
        )`,
        [],
        () => {
          logger.info('Table created successfully.');
          resolve();
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });

export const dropBooksTable = (): Promise<void> =>
  new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'DROP TABLE IF EXISTS books',
        [],
        () => {
          logger.info('Table dropped');
          resolve();
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });

export const insertBook = async (book: UploadedBook): Promise<number | undefined> =>
  new Promise((resolve, reject) => {
    const createdDateTime = new Date().toISOString();
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO books
          (title, mimeType, size, author, filePath, progress, cover, description, createdDateTime)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          book.title || '',
          book.mimeType || '',
          book.size || 0,
          book.author || '',
          book.filePath || '',
          book.progress || 0,
          book.cover || '',
          book.description || '',
          createdDateTime
        ],
        (_, { insertId }) => resolve(insertId),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });

export const fetchBooks = (): Promise<UploadedBook[]> =>
  new Promise<UploadedBook[]>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM books ORDER BY createdDateTime ASC',
        [],
        (_, { rows }) => {
          const books: UploadedBook[] = [];
          for (let i = 0; i < rows.length; i += 1) {
            books.push(rows.item(i));
          }
          resolve(books);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });

export const bookExists = (title: string, author: string): Promise<boolean> =>
  new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'SELECT COUNT(*) as count FROM books WHERE title = ? AND author = ?',
        [title || '', author],
        (_, { rows }) => {
          resolve(rows.item(0).count > 0);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });

export const replaceBook = (book: UploadedBook | null): Promise<void> =>
  new Promise((resolve, reject) => {
    if (!book) {
      logger.warn('No book to replace');
      resolve();
      return;
    }
    const createdDateTime = new Date().toISOString();
    database.transaction((tx) => {
      tx.executeSql(
        `UPDATE books SET
          title = ?, mimeType = ?, size = ?, filePath = ?,
          progress = ?, description = ?, cover = ?, createdDateTime = ?
          WHERE title = ? AND author = ?`,
        [
          book.title || '',
          book.mimeType || '',
          book.size || 0,
          book.filePath || '',
          book.progress || 0,
          book.description || '',
          book.cover || '',
          createdDateTime,
          book.title || '',
          book.author || ''
        ],
        () => {
          logger.info('Book replaced successfully.');
          resolve();
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });

export const deleteBook = (title?: string, author?: string): Promise<void> =>
  new Promise((resolve, reject) => {
    if (!title || !author) {
      logger.warn('No Book title or author provided to delete');
      resolve();
      return;
    }

    database.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM books WHERE title = ? AND author = ?',
        [title, author],
        () => {
          logger.debug('Book deleted successfully.');
          resolve();
        },
        (_, error) => {
          logger.error('Failed to delete book:', error);
          reject(error);
          return false;
        }
      );
    });
  });

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const addBookState = (title: string, author: string, stateObject: Record<string, any>): Promise<void> =>
  new Promise((resolve, reject) => {
    if (!stateObject) {
      logger.warn('No state object provided.');
      resolve();
      return;
    }

    const stateText = JSON.stringify(stateObject);

    database.transaction((tx) => {
      tx.executeSql(
        `UPDATE books
         SET state = ?
         WHERE title = ? AND author = ?`,
        [stateText, title, author],
        () => {
          logger.info('State updated successfully.');
          resolve();
        },
        (_, error) => {
          logger.error('Failed to update state:', error);
          reject(error);
          return false;
        }
      );
    });
  });

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const getBookState = (title: string, author: string): Promise<Record<string, any> | null> =>
  new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'SELECT state FROM books WHERE title = ? AND author = ?',
        [title, author],
        (_, result) => {
          if (result.rows.length > 0) {
            const { state } = result.rows.item(0);
            try {
              resolve(JSON.parse(state));
            } catch (error) {
              logger.error('Failed to parse state:', error);
              resolve(null);
            }
          } else {
            resolve(null);
          }
        },
        (_, error) => {
          logger.error('Failed to fetch state:', error);
          reject(error);
          return false;
        }
      );
    });
  });
