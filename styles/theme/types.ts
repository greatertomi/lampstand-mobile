import { darkColorScheme, lightColorScheme } from '../colors';
import { radius } from '../radius';
import { fontFamily, fontSizes, fontWeights, lineHeights } from '../typography';
import { utilities } from '../utilities';

// eslint-disable-next-line no-shadow
export enum ThemeModeScheme {
  Dark = 'dark',
  Light = 'light',
  System = 'system'
}

export type Theme = {
  colors: typeof darkColorScheme | typeof lightColorScheme;
  radius: typeof radius;
  fontWeights: typeof fontWeights;
  fontSizes: typeof fontSizes;
  lineHeights: typeof lineHeights;
  fontFamily: typeof fontFamily;
  utilities: typeof utilities;
};
