import * as SQLite from 'expo-sqlite';
import { UploadedBook } from './types';

const database = SQLite.openDatabase('people.db');

export const createBooksTable = (): Promise<void> =>
  new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS books (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          mimeType TEXT NOT NULL,
          size INTEGER NOT NULL,
          name TEXT NOT NULL,
          filePath TEXT NOT NULL
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

export const dropBooksTable = (): Promise<void> =>
  new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'DROP TABLE IF EXISTS books',
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

export const insertBook = async (book: UploadedBook): Promise<number | undefined> =>
  new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO books (title, mimeType, size, name, filePath) VALUES (?, ?, ?, ?, ?)',
        [book.title, book.mimeType, book.size, book.name, book.filePath],
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
        'SELECT * FROM books',
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
