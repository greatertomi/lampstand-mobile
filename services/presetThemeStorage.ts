import AsyncStorage from '@react-native-async-storage/async-storage';

import { FontKey } from '../packages/fonts';
import { READING_PRESET } from '../packages/types';
import { logger } from '../utils';

export type PresetThemeCustomization = {
  fontFamily: string;
  fontKey: FontKey;
  isBold: boolean;
  spacing: {
    letter: number;
    word: number;
    line: number;
    paragraph: number;
  };
  customizedAt: string;
};

const PRESET_THEME_KEY_PREFIX = 'preset-theme:';

const getStorageKey = (presetId: READING_PRESET): string => `${PRESET_THEME_KEY_PREFIX}${presetId}`;

export const savePresetTheme = async (
  presetId: READING_PRESET,
  customization: PresetThemeCustomization
): Promise<void> => {
  try {
    const key = getStorageKey(presetId);
    const data = JSON.stringify(customization);
    await AsyncStorage.setItem(key, data);
  } catch (error) {
    logger.error(`Failed to save theme for preset ${presetId}:`, error);
    throw error;
  }
};

export const loadPresetTheme = async (presetId: READING_PRESET): Promise<PresetThemeCustomization | null> => {
  try {
    const key = getStorageKey(presetId);
    const data = await AsyncStorage.getItem(key);

    if (data) {
      return JSON.parse(data) as PresetThemeCustomization;
    }
    return null;
  } catch (error) {
    logger.error(`Failed to load theme for preset ${presetId}:`, error);
    return null;
  }
};

export const deletePresetTheme = async (presetId: READING_PRESET): Promise<void> => {
  try {
    const key = getStorageKey(presetId);
    await AsyncStorage.removeItem(key);
  } catch (error) {
    logger.error(`Failed to delete theme for preset ${presetId}:`, error);
    throw error;
  }
};
