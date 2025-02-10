/* eslint-disable @typescript-eslint/no-explicit-any */

import * as SQLite from 'expo-sqlite';

import { logger } from '../../utils';

import { UploadedBook } from './types';

const database = async () => SQLite.openDatabaseAsync('lampstand.db');

export const createBooksTable = async () => {
  const db = await database();

  try {
    await db.runAsync('PRAGMA busy_timeout = 3000;');
    await db.runAsync(`
    CREATE TABLE IF NOT EXISTS books (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          mimeType TEXT NOT NULL,
          size INTEGER NOT NULL,
          author TEXT NOT NULL,
          filePath TEXT NOT NULL,
          description TEXT NOT NULL,
          cover TEXT,
          createdDateTime TEXT NOT NULL,
          state TEXT,
          UNIQUE(title, author));
  `);
    logger.debug('Table created');
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export const dropBooksTable = async () => {
  const db = await database();

  try {
    await db.runAsync('DROP TABLE IF EXISTS books');
    logger.info('Table dropped');
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export const insertBook = async (book: UploadedBook) => {
  const db = await database();
  const createdDateTime = new Date().toISOString();
  try {
    await db.runAsync(
      `INSERT INTO books (title, mimeType, size, author, filePath, description, cover, createdDateTime, state)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        book.title || '',
        book.mimeType || '',
        book.size || 0,
        book.author || '',
        book.filePath || '',
        book.description || '',
        book.cover || '',
        createdDateTime,
        null
      ]
    );
    logger.info('Book inserted successfully');
  } catch (error) {
    logger.error('Failed to insert book:', error);
    throw error;
  }
};

export const fetchBooks = async () => {
  const db = await database();
  try {
    return (await db.getAllAsync('SELECT * FROM books ORDER BY createdDateTime ASC')) as UploadedBook[];
  } catch (error) {
    logger.error('Failed to fetch books:', error);
    throw error;
  }
};

export const bookExists = async (title: string, author: string) => {
  const db = await database();
  try {
    const books = await db.getAllAsync('SELECT * FROM books where title = ? and author = ?', [title, author]);
    return books.length > 0;
  } catch (error) {
    logger.error('Failed to check if book exists:', error);
    throw error;
  }
};

export const replaceBook = async (book: UploadedBook) => {
  const db = await database();
  const createdDateTime = new Date().toISOString();
  try {
    await db.runAsync(
      `UPDATE books
       SET title = ?, mimeType = ?, size = ?, author = ?, filePath = ?,
       description = ?, cover = ?, createdDateTime = ?, state = ?
       WHERE id = ?`,
      [
        book.title || '',
        book.mimeType || '',
        book.size || 0,
        book.author || '',
        book.filePath || '',
        book.description || '',
        book.cover || '',
        createdDateTime,
        null,
        book.id
      ]
    );
    logger.debug('Book replaced successfully');
  } catch (error) {
    logger.error('Failed to replace book:', error);
    throw error;
  }
};

export const deleteBook = async (id: string) => {
  logger.debug('Deleting book with id:', id);
  const db = await database();
  try {
    await db.runAsync('DELETE FROM books WHERE id = ?', [id]);
    logger.debug('Book deleted successfully');
  } catch (error) {
    logger.error('Failed to delete book:', error);
    throw error;
  }
};

export const addBookState = async (title: string, author: string, stateObject: Record<string, any>) => {
  const db = await database();
  try {
    await db.runAsync('UPDATE books SET state = ? WHERE title = ? AND author = ?', [
      JSON.stringify(stateObject),
      title,
      author
    ]);
    logger.info('Book state updated successfully');
  } catch (error) {
    logger.error('Failed to update book state:', error);
    throw error;
  }
};

export const getBookState = async (title: string, author: string): Promise<any> => {
  const db = await database();
  try {
    const result: UploadedBook | null = await db.getFirstAsync(
      'SELECT state FROM books WHERE title = ? AND author = ?',
      [title, author]
    );
    return result?.state;
  } catch (error) {
    logger.error('Failed to get book state:', error);
    throw error;
  }
};
