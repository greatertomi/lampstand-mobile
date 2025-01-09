import { useContext } from 'react';

import { ReaderContextProps } from '../types';

import { ReaderContext } from './context';

type UseReader = Pick<
  ReaderContextProps,
  'changeFontSize' | 'fontSize' | 'meta' | 'theme' | 'changeTheme' | 'flow' | 'setFlow'
>;
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
  | 'flow'
  | 'setFlow'
  | 'toc'
  | 'goToChapter'
>;

export const useReader = (): UseReader => {
  const context = useContext(ReaderContext);

  if (!context) {
    throw new Error('useReader must be used within a ReaderProvider');
  }

  const {
    fontSize,
    changeFontSize,
    meta,
    theme,
    changeTheme,
    addBookmark,
    bookmarks,
    isBookmarked,
    removeBookmark,
    toc,
    goToChapter,
    flow,
    setFlow
  } = context;
  const { fontSize, changeFontSize, meta, theme, changeTheme, flow, setFlow } = context;

  return { fontSize, changeFontSize, meta, theme, changeTheme, flow, setFlow };
  return {
    fontSize,
    changeFontSize,
    meta,
    theme,
    changeTheme,
    isBookmarked,
    bookmarks,
    addBookmark,
    removeBookmark,
    toc,
    goToChapter,
    flow,
    setFlow
  };
};
