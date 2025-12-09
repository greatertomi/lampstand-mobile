import { FontKey } from './fonts';

export const FONT_DATA: Record<FontKey, string> = {
  PlusJakartaSans: '',
  PoetsenOne: '',
  PortLligatSlab: '',
  PurplePurse: '',
  SeymourOne: '',
  UrbanistBold: ''
};

export const preloadFontData = async (
  fontKey: FontKey,
  getFontBase64Fn: (key: FontKey) => Promise<string>
): Promise<void> => {
  if (!FONT_DATA[fontKey]) {
    FONT_DATA[fontKey] = await getFontBase64Fn(fontKey);
  }
};
