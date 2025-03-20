import React from 'react';
import { DimensionValue } from 'react-native';

import { useTheme } from '../../../../styles';

import { BaseLoader } from './BaseLoader';

interface Props {
  width?: DimensionValue;
  height?: DimensionValue;
}

export const OpeningBook = ({ width, height }: Props) => {
  const { theme } = useTheme();
  return (
    <BaseLoader
      message="Opening book..."
      width={width}
      height={height}
      backgroundColor={theme.colors.background}
      textColor={theme.colors.text}
    />
  );
};
