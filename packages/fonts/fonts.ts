import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

import { logger } from '../../utils';

export type FontConfigType = {
  displayName: string;
  file: number | string;
  boldFile?: number | string;
};

export const FONT_CONFIG: Record<string, FontConfigType> = {
  Domine: {
    displayName: 'Domine',
    file: require('./Domine.ttf'),
    boldFile: require('./Domine-Bold.ttf')
  },
  EBGaramond: {
    displayName: 'EBGaramond',
    file: require('./EBgaramond.ttf'),
    boldFile: require('./EBgaramond-Bold.ttf')
  },
  Handlee: {
    displayName: 'Handlee',
    file: require('./Handlee.ttf')
  },
  Inter: {
    displayName: 'Inter',
    file: require('./Inter-Latin.ttf'),
    boldFile: require('./Inter-Latin-Bold.ttf')
  },
  Literata: {
    displayName: 'Literata',
    file: require('./Literata-Latin.ttf'),
    boldFile: require('./Literata-Latin-Bold.ttf')
  },
  Merriweather: {
    displayName: 'Merriweather',
    file: require('./MerriWeather.ttf'),
    boldFile: require('./MerriWeather-Bold.ttf')
  },
  PatrickHand: {
    displayName: 'Patrick Hand',
    file: require('./Patrick-Hand.ttf')
  },
  PoiretOne: {
    displayName: 'Poiret One',
    file: require('./Poiret-One.ttf')
  },
  PlusJakartaSans: {
    displayName: 'PlusJakartaSans',
    file: require('./PlusJakartaSans.ttf'),
    boldFile: require('./PlusJakartaSans-Bold.ttf')
  },
  Urbanist: {
    displayName: 'Urbanist',
    file: require('./Urbanist-Latin.ttf'),
    boldFile: require('./Urbanist-Latin-Bold.ttf')
  }
} as const;

export const FONTS = Object.fromEntries(
  Object.entries(FONT_CONFIG).map(([key, value]) => [key, value.displayName])
) as Record<keyof typeof FONT_CONFIG, string>;

export const FONT_FILES = Object.fromEntries(
  Object.entries(FONT_CONFIG).map(([key, value]) => [key, value.file])
) as Record<keyof typeof FONT_CONFIG, string>;

export type FontKey = keyof typeof FONTS;

export const getFont = (key: FontKey): string => FONTS[key];

export const getFontBase64 = async (key: FontKey, fileModule?: string | number): Promise<string> => {
  try {
    const fontModule = fileModule || FONT_FILES[key];
    const asset = Asset.fromModule(fontModule);
    await asset.downloadAsync();

    if (!asset.localUri) {
      logger.warn(`Could not get localUri for font ${key}`);
      return '';
    }

    const base64 = await FileSystem.readAsStringAsync(asset.localUri, {
      encoding: FileSystem.EncodingType.Base64
    });

    return `data:font/ttf;charset=utf-8;base64,${base64}`;
  } catch (error) {
    logger.error(`Error loading font base64 for ${key}:`, error);
    return '';
  }
};

export default FONTS;
