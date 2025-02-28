import * as SQLite from 'expo-sqlite/legacy';

export interface Migration {
  version: number;
  up: (tx: SQLite.SQLTransaction) => Promise<void>;
  down: (tx: SQLite.SQLTransaction) => Promise<void>;
}
