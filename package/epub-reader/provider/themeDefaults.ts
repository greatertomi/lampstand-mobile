import { DEFAULT_FONT_KEY } from '../../../styles/fonts';
import { READING_PRESET } from '../../types';

import { CustomThemeSettings } from './CustomThemeProvider';

export const DEFAULT_SETTINGS: CustomThemeSettings = {
  fontSize: '1.0em',
  fontFamily: DEFAULT_FONT_KEY,
  isBoldText: false,
  paragraphSpacing: 0,
  lineSpacing: 0,
  wordSpacing: 0,
  letterSpacing: 0,
  preset: READING_PRESET.ORIGINAL
};
