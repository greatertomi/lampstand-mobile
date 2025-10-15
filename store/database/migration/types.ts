import * as SQLite from 'expo-sqlite';

export interface Migration {
  version: number;
  up: (db: SQLite.SQLiteDatabase) => void | Promise<void>;
  down: (db: SQLite.SQLiteDatabase) => void | Promise<void>;
}
