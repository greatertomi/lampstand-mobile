import { darkColorScheme, lightColorScheme } from '../colors';
import { radius } from '../radius';
import { fontFamily, fontSizes, fontWeights, lineHeights } from '../typography';
import { utilities } from '../utilities';

import { Theme } from './types';

export const darkTheme: Theme = {
  colors: darkColorScheme,
  radius,
  fontWeights,
  fontSizes,
  lineHeights,
  fontFamily,
  utilities
};

export const lightTheme: Theme = {
  colors: lightColorScheme,
  radius,
  fontWeights,
  fontSizes,
  lineHeights,
  fontFamily,
  utilities
};
