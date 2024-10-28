import React from 'react';
import { DimensionValue } from 'react-native';
import { BaseLoader } from './BaseLoader';

type LoadingFileProps = {
  downloadProgress: number;
  width: DimensionValue;
  height: DimensionValue;
};

export const LoadingFile = ({ downloadProgress, width, height }: LoadingFileProps) => (
  <BaseLoader message={`Loading ${downloadProgress}%`} height={height} width={width} />
);
