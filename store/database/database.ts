import * as SQLite from 'expo-sqlite/legacy';

export const database = SQLite.openDatabase('people.db');
