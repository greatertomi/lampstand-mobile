import { useContext } from 'react';

import { ReaderContext } from './context';
import { ReaderContextProps } from './types';

type UseReader = Pick<ReaderContextProps, 'changeFontSize' | 'fontSize' | 'meta' | 'theme' | 'changeTheme'>;

export const useReader = (): UseReader => {
  const context = useContext(ReaderContext);

  if (!context) {
    throw new Error('useReader must be used within a ReaderProvider');
  }

  const { fontSize, changeFontSize, meta, theme, changeTheme } = context;

  return { fontSize, changeFontSize, meta, theme, changeTheme };
};
