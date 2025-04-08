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
  | 'flow'
  | 'setFlow'
  | 'currentLocation'
  | 'totalLocations'
  | 'removeBookmark'
  | 'toc'
  | 'goToChapter'
  | 'goToLocation'
  | 'addHighlight'
  | 'removeHighlight'
  | 'preset'
  | 'applyPreset'
  | 'resetPreset'
  | 'searchBook'
  | 'clearSearchResults'
  | 'searchResults'
  | 'isSearching'
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
    addBookmark,
    bookmarks,
    isBookmarked,
    removeBookmark,
    toc,
    goToChapter,
    flow,
    setFlow,
    currentLocation,
    totalLocations,
    goToLocation,
    addHighlight,
    removeHighlight,
    preset,
    applyPreset,
    resetPreset,
    searchBook,
    clearSearchResults,
    searchResults,
    isSearching,
  } = context;

  return {
    fontSize,
    changeFontSize,
    meta,
    theme,
    isBookmarked,
    bookmarks,
    addBookmark,
    removeBookmark,
    toc,
    goToChapter,
    flow,
    setFlow,
    currentLocation,
    totalLocations,
    goToLocation,
    addHighlight,
    removeHighlight,
    preset,
    applyPreset,
    resetPreset,
    searchBook,
    clearSearchResults,
    searchResults,
    isSearching,
  };
};
