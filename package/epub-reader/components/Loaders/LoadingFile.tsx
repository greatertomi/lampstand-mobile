import React from 'react';
import { DimensionValue } from 'react-native';

import { useTheme } from '../../../../styles';

import { BaseLoader } from './BaseLoader';

type LoadingFileProps = {
  downloadProgress: number;
  width: DimensionValue;
  height: DimensionValue;
};

export const LoadingFile = ({ downloadProgress, width, height }: LoadingFileProps) => {
  const { theme } = useTheme();
  return (
    <BaseLoader message={`Loading ${downloadProgress}%`} height={height} width={width} textColor={theme.colors.text} />
  );
};
