import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

import { logger } from '../../utils';

const FONT_CONFIG = {
  PlusJakartaSans: {
    displayName: 'PlusJakartaSans',
    file: require('../../assets/fonts/PlusJakartaSans-VariableFont_wght.ttf')
  },
  PoetsenOne: {
    displayName: 'PoetsenOne',
    file: require('../../assets/fonts/PoetsenOne-400.ttf')
  },
  PortLligatSlab: {
    displayName: 'PortLligatSlab',
    file: require('../../assets/fonts/PortLligatSlab-400.ttf')
  },
  PurplePurse: {
    displayName: 'PurplePurse',
    file: require('../../assets/fonts/PurplePurse-400.ttf')
  },
  SeymourOne: {
    displayName: 'SeymourOne',
    file: require('../../assets/fonts/SeymourOne-400.ttf')
  },
  UrbanistBold: {
    displayName: 'UrbanistBold',
    file: require('../../assets/fonts/Urbanist-Bold.ttf')
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

export const getFontBase64 = async (key: FontKey): Promise<string> => {
  try {
    const fontModule = FONT_FILES[key];
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
