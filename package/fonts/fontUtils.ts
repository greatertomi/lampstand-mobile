import { READING_PRESET } from '../types';

import { FONT_CONFIG, FontKey } from './fonts';

export const DEFAULT_FONT_SIZE = 14;

export const FONT_DATA: Record<FontKey, string> = {
  Domine: '',
  EBGaramond: '',
  Handlee: '',
  Inter: '',
  Literata: '',
  Merriweather: '',
  PatrickHand: '',
  PoiretOne: '',
  PlusJakartaSans: '',
  Urbanist: ''
};

export const preloadFontData = async (
  fontKey: FontKey,
  getFontBase64Fn: (key: FontKey) => Promise<string>
): Promise<void> => {
  if (!FONT_DATA[fontKey]) {
    FONT_DATA[fontKey] = await getFontBase64Fn(fontKey);
  }
};

export const DEFAULT_PRESET_FONTS: Record<READING_PRESET, FontKey> = {
  [READING_PRESET.ORIGINAL]: 'PlusJakartaSans',
  [READING_PRESET.BOLD]: 'Urbanist',
  [READING_PRESET.PAPER]: 'PatrickHand'
};

export const hasBoldVariant = (fontKey: FontKey) => !!FONT_CONFIG[fontKey]?.boldFile;
