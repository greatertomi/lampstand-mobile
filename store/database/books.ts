import { TrackedState } from '../../package/epub-reader';
import { logger } from '../../utils';

import { database } from './database';
import {
  emitBookAdded,
  emitBookDeleted,
  emitBookStateFetched,
  emitBookStateUpdated,
  emitBookUpdated,
  emitTableExistsChecked
} from './events';
import { emitBookMarkedComplete } from './events/bookEvents';
import { UploadedBook } from './types';

export const checkIfTableExists = (tableName: string): Promise<boolean> =>
  new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `PRAGMA table_info(${tableName})`,
        [],
        (_, { rows }) => {
          const doesTableExist = rows.length > 0;
          emitTableExistsChecked(tableName, doesTableExist);
          resolve(doesTableExist);
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
          id STRING PRIMARY KEY,
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
  });

export const dropBooksTable = (): Promise<void> =>
  new Promise((resolve, reject) => {
    database.transaction((tx) => {
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
  });

export const insertBook = async (book: UploadedBook): Promise<number | undefined> =>
  new Promise((resolve, reject) => {
    const createdDateTime = new Date().toISOString();
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO books
          (id, title, mimeType, size, author, filePath, cover, description, isFinished, createdDateTime, state)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          book.id || '',
          book.title || '',
          book.mimeType || '',
          book.size || 0,
          book.author || '',
          book.filePath || '',
          book.cover || '',
          book.description || '',
          book.isFinished || 0,
          createdDateTime,
          null
        ],
        (_, { insertId }) => {
          emitBookAdded({ ...book });
          resolve(insertId);
        },
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
            const book = rows.item(i);
            try {
              if (book.state) {
                book.state = JSON.parse(book.state);
              }
            } catch (error) {
              logger.error('Failed to parse state:', error);
              book.state = null;
            }
            books.push(book);
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
          id = ?, title = ?, mimeType = ?, size = ?, filePath = ?, isFinished = ?,
          description = ?, cover = ?, createdDateTime = ?
          WHERE title = ? AND author = ?`,
        [
          book.id || '',
          book.title || '',
          book.mimeType || '',
          book.size || 0,
          book.filePath || '',
          book.description || '',
          book.cover || '',
          book.isFinished || 0,
          createdDateTime,
          book.title || '',
          book.author || ''
        ],
        () => {
          logger.info('Book replaced successfully.');
          emitBookUpdated(book);
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
          emitBookDeleted();
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

export const addBookState = (title: string, author: string, stateObject: TrackedState): Promise<void> =>
  new Promise((resolve, reject) => {
    if (!stateObject) {
      logger.warn('No state object provided.');
      resolve();
      return;
    }

    const stateObjectString = JSON.stringify(stateObject);

    database.transaction((tx) => {
      tx.executeSql(
        `UPDATE books
         SET state = ?
         WHERE title = ? AND author = ?`,
        [stateObjectString, title, author],
        () => {
          logger.info('State updated successfully.');
          emitBookStateUpdated(title, author, stateObject);
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

export const getBookState = (title: string, author: string): Promise<TrackedState | null> => {
  if (!title || !author) {
    return Promise.resolve(null);
  }

  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'SELECT state FROM books WHERE title = ? AND author = ?',
        [title, author],
        (_, result) => {
          if (result.rows.length > 0) {
            const { state } = result.rows.item(0);
            try {
              const parsedState: TrackedState = JSON.parse(state);
              emitBookStateFetched(title, author, parsedState);
              resolve(parsedState);
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
};

export const markBookFinished = (title?: string, author?: string): Promise<void> =>
  new Promise((resolve, reject) => {
    if (!title || !author) {
      logger.warn('No book to update completion status');
      resolve();
      return;
    }

    database.transaction((tx) => {
      tx.executeSql(
        'UPDATE books SET isFinished = 1 WHERE title = ? AND author = ?',
        [title, author],
        () => {
          logger.info('Book completion status toggled successfully.');
          emitBookMarkedComplete();
          resolve();
        },
        (_, error) => {
          logger.error('Failed to toggle book completion status:', error);
          reject(error);
          return false;
        }
      );
    });
  });
