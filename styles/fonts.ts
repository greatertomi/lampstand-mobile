// src/styles/fonts.ts
export type FontValue =
  | 'plus-jakarta-sans'
  | 'poetsen-one'
  | 'purple-purse'
  | 'cabinet-grotesk'
  | 'seymour-one'
  | 'bogart'
  | 'port-lligat-slab'
  | 'urbanist-bold';

export interface FontFamily {
  label: string;
  value: FontValue;
}

export const FONT_KEYS = {
  PLUS_JAKARTA: 'plus-jakarta-sans',
  POETSEN_ONE: 'poetsen-one',
  PURPLE_PURSE: 'purple-purse',
  CABINET_GROTESK: 'cabinet-grotesk',
  SEYMOUR_ONE: 'seymour-one',
  BOGART: 'bogart',
  PORT_LLIGAT: 'port-lligat-slab',
  URBANIST_BOLD: 'urbanist-bold',
} as const;

export const getFontDisplayName = (fontValue: FontValue): string => {
  const fontMap: Record<FontValue, string> = {
    'plus-jakarta-sans': 'Plus Jakarta Sans',
    'poetsen-one': 'Poetsen One',
    'purple-purse': 'Purple Purse',
    'cabinet-grotesk': 'Cabinet Grotesk',
    'seymour-one': 'Seymour One',
    bogart: 'Bogart',
    'port-lligat-slab': 'Port Lligat Slab',
    'urbanist-bold': 'Urbanist Bold',
  };

  return fontMap[fontValue] || fontValue;
};

export const FONT_FAMILIES: FontFamily[] = Object.values(FONT_KEYS).map(
  (value) => ({
    label: getFontDisplayName(value as FontValue),
    value: value as FontValue,
  })
);
