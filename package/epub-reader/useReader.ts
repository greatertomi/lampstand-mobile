import { useContext, useEffect } from 'react';

import { addBookState, getBookState } from '../../store';
import { logger } from '../../utils';

import { ReaderContext, ReaderContextProps } from './context';

type UseReader = Pick<ReaderContextProps, 'changeFontSize' | 'fontSize' | 'meta' | 'theme' | 'changeTheme'>;

export const useReader = (): UseReader => {
  const context = useContext(ReaderContext);

  if (!context) {
    throw new Error('useReader must be used within a ReaderProvider');
  }

  const { fontSize, changeFontSize, theme, changeTheme } = context;

  return { fontSize, changeFontSize, theme, changeTheme };
};
