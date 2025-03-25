import React from 'react';
import { DimensionValue } from 'react-native';

import { ThemeSource } from '../../types';

import { BaseLoader } from './BaseLoader';

type LoadingFileProps = {
  downloadProgress: number;
  width: DimensionValue;
  height: DimensionValue;
  theme?: ThemeSource;
};

export const LoadingFile = ({ downloadProgress, width, height, theme }: LoadingFileProps) => (
  <BaseLoader message={`Loading ${downloadProgress}%`} height={height} width={width} textColor={theme?.colors.text} />
  );
