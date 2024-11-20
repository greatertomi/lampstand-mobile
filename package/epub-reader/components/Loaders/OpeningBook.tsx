import React from 'react';
import { DimensionValue } from 'react-native';

import { BaseLoader } from './BaseLoader';

interface Props {
  width?: DimensionValue;
  height?: DimensionValue;
}

export const OpeningBook = ({ width, height }: Props) => (
  <BaseLoader message="Opening book..." width={width} height={height} />
);
