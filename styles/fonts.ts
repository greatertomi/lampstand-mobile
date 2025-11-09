export const FONT_KEYS = {
  PLUS_JAKARTA_SANS: 'plus-jakarta-sans',
  POETSEN_ONE: 'poetsen-one',
  PURPLE_PURSE: 'purple-purse',
  CABINET_GROTESK: 'cabinet-grotesk',
  SEYMOUR_ONE: 'seymour-one',
  BOGART: 'bogart',
  PORT_LLIGAT_SLAB: 'port-lligat-slab',
  URBANIST_BOLD: 'urbanist-bold'
} as const;

export type FontKey = (typeof FONT_KEYS)[keyof typeof FONT_KEYS];
export interface FontInfo {
  name: string;
  asset: number;
}

// Font map with assets
export const FONT_MAP: Record<FontKey, FontInfo> = {
  [FONT_KEYS.PLUS_JAKARTA_SANS]: {
    name: 'PlusJakartaSans-Regular',
    asset: require('../assets/fonts/PlusJakartaSans-Regular.ttf')
  },
  [FONT_KEYS.POETSEN_ONE]: {
    name: 'PoetsenOne-Regular',
    asset: require('../assets/fonts/PoetsenOne-Regular.ttf')
  },
  [FONT_KEYS.PURPLE_PURSE]: {
    name: 'PurplePurse-Regular',
    asset: require('../assets/fonts/PurplePurse-Regular.ttf')
  },
  [FONT_KEYS.CABINET_GROTESK]: {
    name: 'CabinetGrotesk-Variable',
    asset: require('../assets/fonts/CabinetGrotesk-Variable.ttf')
  },
  [FONT_KEYS.SEYMOUR_ONE]: {
    name: 'SeymourOne-Regular',
    asset: require('../assets/fonts/SeymourOne-Regular.ttf')
  },
  [FONT_KEYS.BOGART]: {
    name: 'BOGARTREGULARTRIAL',
    asset: require('../assets/fonts/BOGARTREGULARTRIAL.ttf')
  },
  [FONT_KEYS.PORT_LLIGAT_SLAB]: {
    name: 'PortLligatSlab-Regular',
    asset: require('../assets/fonts/PortLligatSlab-Regular.ttf')
  },
  [FONT_KEYS.URBANIST_BOLD]: {
    name: 'Urbanist-Bold',
    asset: require('../assets/fonts/Urbanist-Bold.ttf')
  }
};

// Default font key
export const DEFAULT_FONT_KEY: FontKey = FONT_KEYS.PLUS_JAKARTA_SANS;

// Get font info safely
export const getFontInfo = (fontKey: FontKey | string): FontInfo =>
  FONT_MAP[fontKey as FontKey] || FONT_MAP[DEFAULT_FONT_KEY];

// Friendly display names
export const FONT_DISPLAY_NAMES: Record<FontKey, string> = {
  [FONT_KEYS.PLUS_JAKARTA_SANS]: 'Plus Jakarta Sans',
  [FONT_KEYS.POETSEN_ONE]: 'Poetsen One',
  [FONT_KEYS.PURPLE_PURSE]: 'Purple Purse',
  [FONT_KEYS.CABINET_GROTESK]: 'Cabinet Grotesk',
  [FONT_KEYS.SEYMOUR_ONE]: 'Seymour One',
  [FONT_KEYS.BOGART]: 'Bogart',
  [FONT_KEYS.PORT_LLIGAT_SLAB]: 'Port Lligat Slab',
  [FONT_KEYS.URBANIST_BOLD]: 'Urbanist Bold'
};

// Helper to get display name
export const getFontDisplayName = (fontKey: FontKey) => FONT_DISPLAY_NAMES[fontKey];
