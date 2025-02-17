import { ImageSourcePropType } from 'react-native';

import { TrackedState } from '../package/epub-reader';

export interface UploadedBook {
  title?: string;
  mimeType: string;
  size: number;
  author?: string;
  filePath: string;
  cover: string | null;
  image?: ImageSourcePropType;
  isFinished: number;
  description?: string;
  state?: TrackedState;
}

export enum BookEventTypes {
  BOOK_ADDED = 'BOOK_ADDED',
  BOOK_UPDATED = 'BOOK_UPDATED',
  BOOK_DELETED = 'BOOK_DELETED',
  TABLE_CREATED = 'TABLE_CREATED',
  TABLE_DROPPED = 'TABLE_DROPPED',
  BOOK_STATE_UPDATED = 'BOOK_STATE_UPDATED',
  BOOK_STATE_FETCHED = 'BOOK_STATE_FETCHED',
  TABLE_EXISTS_CHECKED = 'TABLE_EXISTS_CHECKED'
}
