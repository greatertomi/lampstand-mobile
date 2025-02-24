import EvenEmitter from 'eventemitter3';

import { TrackedState } from '../../../package/epub-reader';
import { UploadedBook } from '../types';

export enum BookEventTypes {
  REFRESH_BOOK = 'REFRESH_BOOK',
  BOOK_ADDED = 'BOOK_ADDED',
  BOOK_UPDATED = 'BOOK_UPDATED',
  BOOK_DELETED = 'BOOK_DELETED',
  BOOK_STATE_UPDATED = 'BOOK_STATE_UPDATED',
  BOOK_STATE_FETCHED = 'BOOK_STATE_FETCHED',
  TABLE_EXISTS_CHECKED = 'TABLE_EXISTS_CHECKED'
}

export const bookEvents = new EvenEmitter();

export const emitBookAdded = (book: UploadedBook) => {
  bookEvents.emit(BookEventTypes.BOOK_ADDED, book);
};

export const emitBookUpdated = (book: UploadedBook) => {
  bookEvents.emit(BookEventTypes.BOOK_UPDATED, book);
};

export const emitBookDeleted = () => {
  bookEvents.emit(BookEventTypes.REFRESH_BOOK);
};

export const emitTableCreated = () => {
  bookEvents.emit(BookEventTypes.REFRESH_BOOK);
};

export const emitTableDropped = () => {
  bookEvents.emit(BookEventTypes.REFRESH_BOOK);
};

export const emitBookStateUpdated = (title: string, author: string, state: TrackedState) => {
  bookEvents.emit(BookEventTypes.BOOK_STATE_UPDATED, { title, author, state });
};

export const emitBookStateFetched = (title: string, author: string, state: TrackedState | null) => {
  bookEvents.emit(BookEventTypes.BOOK_STATE_FETCHED, { title, author, state });
};

export const emitTableExistsChecked = (tableName: string, exists: boolean) => {
  bookEvents.emit(BookEventTypes.TABLE_EXISTS_CHECKED, { tableName, exists });
};

export const emitBookMarkedComplete = () => {
  bookEvents.emit(BookEventTypes.REFRESH_BOOK);
};
