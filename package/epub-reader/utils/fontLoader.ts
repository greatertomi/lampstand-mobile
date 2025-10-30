import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

interface FontAsset {
  name: string;
  file: string;
  uri?: string;
}

const FONT_ASSETS: Record<string, FontAsset> = {
  'plus-jakarta-sans': {
    name: 'PlusJakartaSans-Regular',
    file: require('../../../assets/fonts/PlusJakartaSans-Regular.ttf')
  },
  'poetsen-one': {
    name: 'PoetsenOne-Regular',
    file: require('../../../assets/fonts/PoetsenOne-Regular.ttf')
  },
  'purple-purse': {
    name: 'PurplePurse-Regular',
    file: require('../../../assets/fonts/PurplePurse-Regular.ttf')
  },
  'cabinet-grotesk': {
    name: 'CabinetGrotesk-Variable',
    file: require('../../../assets/fonts/CabinetGrotesk-Variable.ttf')
  },
  'seymour-one': {
    name: 'SeymourOne-Regular',
    file: require('../../../assets/fonts/SeymourOne-Regular.ttf')
  },
  bogart: {
    name: 'BOGARTREGULARTRIAL',
    file: require('../../../assets/fonts/BOGARTREGULARTRIAL.ttf')
  },
  'port-lligat-slab': {
    name: 'PortLligatSlab-Regular',
    file: require('../../../assets/fonts/PortLligatSlab-Regular.ttf')
  },
  'urbanist-bold': {
    name: 'Urbanist-Bold',
    file: require('../../../assets/fonts/Urbanist-Bold.ttf')
  }
};

/**
 * Load font assets and get their local URIs
 */
export const loadFontAssets = async (): Promise<Record<string, string>> => {
  const fontUris: Record<string, string> = {};

  try {
    const fontPromises = Object.entries(FONT_ASSETS).map(async ([key, { file }]) => {
      const asset = Asset.fromModule(file);
      await asset.downloadAsync();

      if (asset.localUri) {
        fontUris[key] = asset.localUri;
      }

      return { key, uri: asset.localUri };
    });

    await Promise.all(fontPromises);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error loading font assets:', error);
  }

  return fontUris;
};

/**
 * Convert font file to base64
 */
export const getFontAsBase64 = async (fontKey: string): Promise<string | null> => {
  try {
    const fontAsset = FONT_ASSETS[fontKey];
    if (!fontAsset) return null;

    const asset = Asset.fromModule(fontAsset.file);
    await asset.downloadAsync();

    if (asset.localUri) {
      return await FileSystem.readAsStringAsync(asset.localUri, {
        encoding: FileSystem.EncodingType.Base64
      });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error loading font ${fontKey} as base64:`, error);
  }

  return null;
};

/**
 * Generate CSS @font-face rules with base64 embedded fonts
 */
export const generateFontFaceCSS = async (): Promise<string> => {
  const fontFaceRules: string[] = [];
  const fontEntries = Object.entries(FONT_ASSETS);

  for (const [key, { name }] of fontEntries) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const base64Font = await getFontAsBase64(key);

      if (base64Font) {
        fontFaceRules.push(`
          @font-face {
            font-family: '${name}';
            src: url('data:font/truetype;charset=utf-8;base64,${base64Font}') format('truetype');
            font-display: swap;
            font-weight: normal;
            font-style: normal;
          }
        `);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error generating font-face for ${key}:`, error);
    }
  }

  return fontFaceRules.join('\n');
};

/**
 * Get the proper font family value for CSS in WebView
 * Since WebView can't access fonts loaded via useFonts, we use system fonts
 */
export const getFontFamilyCSS = (fontKey: string): string => {
  // Map to closest system font equivalents for WebView
  const systemFontMap: Record<string, string> = {
    'plus-jakarta-sans': '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
    'poetsen-one': '"Comic Sans MS", "Chalkboard SE", "Comic Neue", cursive, sans-serif',
    'purple-purse': '"Comic Sans MS", "Chalkboard SE", "Marker Felt", fantasy, cursive',
    'cabinet-grotesk': '"Arial", "Helvetica Neue", "Helvetica", sans-serif',
    'seymour-one': '"Georgia", "Times New Roman", "Times", serif',
    bogart: '"Arial Black", "Arial Bold", "Gadget", sans-serif',
    'port-lligat-slab': '"Rockwell", "Courier New", "Courier", "Georgia", serif',
    'urbanist-bold': '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif'
  };

  return systemFontMap[fontKey] || '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
};

/**
 * Get the font family name for React Native Text component
 */
export const getFontFamilyForRN = (fontKey: string): string => fontKey; // React Native uses the key name from useFonts

export { FONT_ASSETS };
