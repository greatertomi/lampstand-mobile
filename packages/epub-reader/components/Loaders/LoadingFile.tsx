import React from 'react';
import { DimensionValue } from 'react-native';

import { Theme } from '../../../../styles';

import { BaseLoader } from './BaseLoader';

type LoadingFileProps = {
  downloadProgress: number;
  width: DimensionValue;
  height: DimensionValue;
  theme?: Theme;
};

export const LoadingFile = ({ downloadProgress, width, height, theme }: LoadingFileProps) => (
  <BaseLoader message={`Loading ${downloadProgress}%`} height={height} width={width} textColor={theme?.colors.text} />
);
