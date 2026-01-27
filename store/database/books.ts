import { BookTrackedState, Note } from '../../packages/types';
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
import { emitRefreshBook } from './events/bookEvents';
import { UploadedBook } from './types';

const failedToParseState = 'Failed to parse state:';

export const checkIfTableExists = (tableName: string): boolean => {
  try {
    const result = database.getAllSync(`PRAGMA table_info(${tableName})`);
    const doesTableExist = result.length > 0;
    emitTableExistsChecked(tableName, doesTableExist);
    return doesTableExist;
  } catch (error) {
    throw new Error(`Failed to check if table ${tableName} exists: ${error}`);
  }
};

export const dropBooksTable = (): void => {
  try {
    database.execSync('DROP TABLE IF EXISTS books');
    logger.debug('Table dropped');
    emitTableDropped();
  } catch (error) {
    throw new Error(`Failed to drop books table: ${error}`);
  }
};

export const insertBook = (book: UploadedBook): number | undefined => {
  try {
    const createdDateTime = new Date().toISOString();
    const result = database.runSync(
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
      ]
    );
    emitBookAdded({ ...book });
    return result.lastInsertRowId;
  } catch (error) {
    throw new Error(`Failed to insert book: ${error}`);
  }
};

export const fetchBooks = (): UploadedBook[] => {
  try {
    const rows = database.getAllSync('SELECT * FROM books ORDER BY createdDateTime ASC');
    const books: UploadedBook[] = [];

    for (const book of rows) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const bookRecord = book as any;
      try {
        if (bookRecord.state) {
          bookRecord.state = JSON.parse(bookRecord.state);
        }
      } catch (error) {
        logger.error(failedToParseState, error);
        bookRecord.state = null;
      }
      books.push(bookRecord as UploadedBook);
    }

    return books;
  } catch (error) {
    throw new Error(`Failed to fetch books: ${error}`);
  }
};

export const bookExists = (title: string, author: string): boolean => {
  try {
    const result = database.getFirstSync('SELECT COUNT(*) as count FROM books WHERE title = ? AND author = ?', [
      title || '',
      author
    ]) as { count: number } | null;
    return (result?.count || 0) > 0;
  } catch (error) {
    throw new Error(`Failed to check if book exists: ${error}`);
  }
};

export const replaceBook = (book: UploadedBook | null): void => {
  if (!book) {
    logger.warn('No book to replace');
    return;
  }

  try {
    const createdDateTime = new Date().toISOString();
    database.runSync(
      `UPDATE books SET
        id = ?, title = ?, mimeType = ?, size = ?, filePath = ?, description = ?,
        cover = ?, isFinished = ?, createdDateTime = ?
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
      ]
    );
    logger.debug('Book replaced successfully.');
    emitBookUpdated(book);
  } catch (error) {
    throw new Error(`Failed to replace book: ${error}`);
  }
};

export const deleteBook = (id: string): void => {
  if (!id) {
    logger.warn('No Book id provided to delete');
    return;
  }

  try {
    database.runSync('DELETE FROM books WHERE id = ?', [id]);
    logger.debug('Book deleted successfully.');
    emitBookDeleted();
  } catch (error) {
    logger.error('Failed to delete book:', error);
    throw new Error(`Failed to delete book: ${error}`);
  }
};

export const addBookState = (id: string, stateObject: BookTrackedState): void => {
  if (!stateObject) {
    logger.warn('No state object provided.');
    return;
  }

  try {
    const stateObjectString = JSON.stringify(stateObject);
    database.runSync(
      `UPDATE books
       SET state = ?
       WHERE id = ?`,
      [stateObjectString, id]
    );
    logger.debug('State updated successfully.');
    emitBookStateUpdated(id, stateObject);
  } catch (error) {
    logger.error(failedToParseState, error);
    throw new Error(`Failed to add book state: ${error}`);
  }
};

export const getBookState = (id: string): BookTrackedState | null => {
  if (!id) {
    return null;
  }

  try {
    const result = database.getFirstSync('SELECT state FROM books WHERE id = ?', [id]) as { state: string } | null;

    if (result && result.state) {
      try {
        const parsedState: BookTrackedState = JSON.parse(result.state);
        emitBookStateFetched(id, parsedState);
        return parsedState;
      } catch (error) {
        logger.error(failedToParseState, error);
        return null;
      }
    }

    return null;
  } catch (error) {
    logger.error('Failed to fetch state:', error);
    throw new Error(`Failed to get book state: ${error}`);
  }
};

export const markBookFinished = (id: string): void => {
  if (!id) {
    logger.warn('No book to update completion status');
    return;
  }

  try {
    database.runSync('UPDATE books SET isFinished = 1 WHERE id = ?', [id]);
    logger.debug('Book completion status toggled successfully.');
    emitRefreshBook();
  } catch (error) {
    logger.error('Failed to toggle book completion status:', error);
    throw new Error(`Failed to mark book finished: ${error}`);
  }
};

export const deleteBookmark = (bookId: string, bookmarkId: string): void => {
  if (!bookId || !bookmarkId) {
    logger.warn('No book id or bookmark id provided to delete bookmark');
    return;
  }

  try {
    const result = database.getFirstSync('SELECT state FROM books WHERE id = ?', [bookId]) as { state: string } | null;

    if (result && result.state) {
      try {
        const parsedState: BookTrackedState = JSON.parse(result.state);
        const updatedBookmarks = parsedState.bookmarks.filter((bookmark) => bookmark.id !== bookmarkId);
        const updatedState = { ...parsedState, bookmarks: updatedBookmarks };
        const updatedStateString = JSON.stringify(updatedState);

        database.runSync('UPDATE books SET state = ? WHERE id = ?', [updatedStateString, bookId]);
        logger.debug('Bookmark deleted successfully.');
        emitBookStateUpdated(bookId, updatedState);
      } catch (error) {
        logger.error(failedToParseState, error);
        throw new Error(`Failed to parse state: ${error}`);
      }
    }
  } catch (error) {
    logger.error('Failed to delete bookmark:', error);
    throw new Error(`Failed to delete bookmark: ${error}`);
  }
};

export const deleteHighlightedText = (bookId: string, highlightedTextId: number | undefined): void => {
  if (!bookId || !highlightedTextId) {
    logger.warn('No book id or highlighted text id provided to delete highlighted text');
    return;
  }

  try {
    const parsedState = getBookState(bookId);
    if (!parsedState) return;

    const updatedHighlightedTexts = parsedState.highlights.filter(
      (highlightedText) => highlightedText.id !== highlightedTextId
    );

    const updatedState = { ...parsedState, highlightedTexts: updatedHighlightedTexts };
    addBookState(bookId, updatedState);
    emitBookStateUpdated(bookId, updatedState);
    emitRefreshBook();
    logger.debug('Highlighted text deleted successfully.');
  } catch (error) {
    logger.error(`Failed to delete highlighted text: ${error}`);
    throw error;
  }
};

export const addNote = (bookId: string, values: Note): void => {
  if (!bookId || !values.id) {
    logger.warn('No book id provided to add note');
    return;
  }

  try {
    const state = getBookState(bookId);
    if (!state) return;
    const updatedNote = [...state.notes, values];
    const updatedState = { ...state, notes: updatedNote };
    addBookState(bookId, updatedState);
    emitBookStateUpdated(bookId, updatedState);
    logger.debug('Note added successfully.');
  } catch (error) {
    logger.error(`Failed to add note: ${error}`);
    throw error;
  }
};

export const editNote = (bookId: string, values: Note): void => {
  if (!bookId || !values.id) {
    logger.warn('No book id provided to edit note');
    return;
  }
  try {
    const state = getBookState(bookId);
    if (!state) return;
    const updatedNote = state.notes.map((item) => (item.id === values.id ? values : item));
    const updatedState = { ...state, notes: updatedNote };
    addBookState(bookId, updatedState);
    emitBookStateUpdated(bookId, updatedState);
    logger.debug('Note edited successfully.');
  } catch (error) {
    logger.error(`Failed to edit note: ${error}`);
    throw error;
  }
};

export const deleteNote = (bookId: string, note: Note): void => {
  if (!bookId || !note.id) {
    logger.warn('No book id provided to remove note');
    return;
  }

  try {
    const state = getBookState(bookId);
    if (!state) return;
    const updatedNote = state.notes.filter((item) => item.id !== note.id);
    const updatedState = { ...state, notes: updatedNote };
    addBookState(bookId, updatedState);
    emitBookStateUpdated(bookId, updatedState);
    logger.debug('Note deleted successfully.');
  } catch (error) {
    logger.error(`Failed to delete note: ${error}`);
    throw error;
  }
};
