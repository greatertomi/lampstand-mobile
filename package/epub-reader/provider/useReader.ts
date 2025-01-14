import { useContext } from 'react';

import { ReaderContextProps } from '../types';

import { ReaderContext } from './context';

type UseReader = Pick<
  ReaderContextProps,
  | 'changeFontSize'
  | 'fontSize'
  | 'addBookmark'
  | 'bookmarks'
  | 'isBookmarked'
  | 'meta'
  | 'theme'
  | 'changeTheme'
  | 'removeBookmark'
>;

export const useReader = (): UseReader => {
  const context = useContext(ReaderContext);

  if (!context) {
    throw new Error('useReader must be used within a ReaderProvider');
  }

  const { fontSize, changeFontSize, meta, theme, changeTheme, addBookmark, bookmarks, isBookmarked, removeBookmark } =
    context;

  return { fontSize, changeFontSize, meta, theme, changeTheme, addBookmark, bookmarks, isBookmarked, removeBookmark };
};
