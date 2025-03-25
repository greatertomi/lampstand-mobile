import React from 'react';
import { DimensionValue } from 'react-native';

import { ThemeSource } from '../../types';

import { BaseLoader } from './BaseLoader';

interface Props {
  width?: DimensionValue;
  height?: DimensionValue;
  theme?: ThemeSource
}

export const OpeningBook = ({ width, height, theme }: Props) => (
  <BaseLoader
    message="Opening book..."
    width={width}
    height={height}
    backgroundColor={theme?.colors.background}
    textColor={theme?.colors.text}
  />
  );
