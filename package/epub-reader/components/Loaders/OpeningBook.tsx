import React from 'react';
import { DimensionValue } from 'react-native';

import { Theme } from '../../../../styles';

import { BaseLoader } from './BaseLoader';

interface Props {
  width?: DimensionValue;
  height?: DimensionValue;
  theme?: Theme;
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
