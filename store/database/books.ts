import { TrackedState } from '../../package/epub-reader';
import { logger } from '../../utils';

import { database } from './database';
import {
  emitBookAdded,
  emitBookDeleted,
  emitBookStateFetched,
  emitBookStateUpdated,
  emitBookUpdated,
  emitTableDropped,
  emitTableExistsChecked
} from './events';
import { emitBookMarkedComplete } from './events/bookEvents';
import { UploadedBook } from './types';

const failedToParseState = 'Failed to parse state:';

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
              logger.error(failedToParseState, error);
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

export const deleteBook = (id: string): Promise<void> =>
  new Promise((resolve, reject) => {
    if (!id) {
      logger.warn('No Book id provided to delete');
      resolve();
      return;
    }

    database.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM books WHERE id = ?',
        [id],
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

export const addBookState = (id: string, stateObject: TrackedState): Promise<void> =>
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
         WHERE id = ?`,
        [stateObjectString, id],
        () => {
          logger.debug('State updated successfully.');
          emitBookStateUpdated(id, stateObject);
          resolve();
        },
        (_, error) => {
          logger.error(failedToParseState, error);
          reject(error);
          return false;
        }
      );
    });
  });

export const getBookState = (id: string): Promise<TrackedState | null> => {
  if (!id) {
    return Promise.resolve(null);
  }

  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'SELECT state FROM books WHERE id = ?',
        [id],
        (_, result) => {
          if (result.rows.length > 0) {
            const { state } = result.rows.item(0);
            try {
              const parsedState: TrackedState = JSON.parse(state);
              emitBookStateFetched(id, parsedState);
              resolve(parsedState);
            } catch (error) {
              logger.error(failedToParseState, error);
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

export const markBookFinished = (id: string): Promise<void> =>
  new Promise((resolve, reject) => {
    if (!id) {
      logger.warn('No book to update completion status');
      resolve();
      return;
    }

    database.transaction((tx) => {
      tx.executeSql(
        'UPDATE books SET isFinished = 1 WHERE id = ?',
        [id],
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

export const deleteBookmark = (bookId: string, bookmarkId: string): Promise<void> =>
  new Promise((resolve, reject) => {
    if (!bookId || !bookmarkId) {
      logger.warn('No book id or bookmark id provided to delete bookmark');
      resolve();
      return;
    }

    database.transaction((tx) => {
      tx.executeSql(
        'SELECT state FROM books WHERE id = ?',
        [bookId],
        (_, result) => {
          if (result.rows.length > 0) {
            const { state } = result.rows.item(0);
            try {
              const parsedState: TrackedState = JSON.parse(state);
              const updatedBookmarks = parsedState.bookmarks.filter((bookmark) => bookmark.id !== bookmarkId);
              const updatedState = { ...parsedState, bookmarks: updatedBookmarks };
              const updatedStateString = JSON.stringify(updatedState);

              tx.executeSql(
                'UPDATE books SET state = ? WHERE id = ?',
                [updatedStateString, bookId],
                () => {
                  logger.info('Bookmark deleted successfully.');
                  emitBookStateUpdated(bookId, updatedState);
                  resolve();
                },
                (__, error) => {
                  logger.error('Failed to update state:', error);
                  reject(error);
                  return false;
                }
              );
            } catch (error) {
              logger.error(failedToParseState, error);
              reject(error);
            }
          } else {
            resolve();
          }
        },
        (txErr, error) => {
          logger.error('Failed to fetch state:', error);
          reject(error);
          return false;
        }
      );
    });
  });
