import { useContext } from 'react';

import { ReaderContext, ReaderContextProps } from './context';

type UseReader = Pick<ReaderContextProps, 'changeFontSize' | 'fontSize'>;

export const useReader = (): UseReader => {
  const context = useContext(ReaderContext);

  if (!context) {
    throw new Error('useReader must be used within a ReaderProvider');
  }

  const { fontSize, changeFontSize } = context;

  return { fontSize, changeFontSize };
};
