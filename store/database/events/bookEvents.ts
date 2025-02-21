import EvenEmitter from 'eventemitter3';

import { TrackedState } from '../../../package/epub-reader';
import { BookEventTypes, UploadedBook } from '../../types';

export const bookEvents = new EvenEmitter();

export const emitBookAdded = (book: UploadedBook) => {
  bookEvents.emit(BookEventTypes.BOOK_ADDED, book);
};

export const emitBookUpdated = (book: UploadedBook) => {
  bookEvents.emit(BookEventTypes.BOOK_UPDATED, book);
};

export const emitBookDeleted = () => {
  bookEvents.emit(BookEventTypes.BOOK_DELETED);
};

export const emitTableCreated = () => {
  bookEvents.emit(BookEventTypes.TABLE_CREATED);
};

export const emitTableDropped = () => {
  bookEvents.emit(BookEventTypes.TABLE_DROPPED);
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
