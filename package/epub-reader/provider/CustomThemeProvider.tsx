import React, { createContext, useContext, useCallback, useEffect, useState, useMemo, ReactNode } from 'react';

import { getLocalStorageItem, logger, setLocalStorageItem } from '../../../utils';
import { READING_PRESET } from '../../types';

export interface CustomThemeSettings {
  fontSize: string;
  fontFamily: string;
  isBoldText: boolean;
  paragraphSpacing: number;
  lineSpacing: number;
  wordSpacing: number;
  letterSpacing: number;
  preset: READING_PRESET;
}

const CUSTOM_THEME_STORAGE_KEY = '@lampstand_custom_theme_settings';

const DEFAULT_SETTINGS: CustomThemeSettings = {
  fontSize: '1.0em',
  fontFamily: 'plus-jakarta-sans',
  isBoldText: false,
  paragraphSpacing: 0,
  lineSpacing: 0,
  wordSpacing: 0,
  letterSpacing: 0,
  preset: READING_PRESET.ORIGINAL
};

interface CustomThemeContextType {
  customSettings: CustomThemeSettings;
  isLoaded: boolean;
  updateSetting: <K extends keyof CustomThemeSettings>(key: K, value: CustomThemeSettings[K]) => void;
  updateSettings: (updates: Partial<CustomThemeSettings>) => void;
  resetSettings: (preset?: READING_PRESET) => void;
  applyPresetDefaults: (preset: READING_PRESET) => void;
  generateCSSStyles: () => {
    fontSize: string;
    fontFamily: string;
    fontWeight: string;
    paragraphSpacing: string;
    lineHeight: string;
    wordSpacing: string;
    letterSpacing: string;
  };
  hasCustomizations: () => boolean;
}

const CustomThemeContext = createContext<CustomThemeContextType | undefined>(undefined);

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  const [customSettings, setCustomSettings] = useState<CustomThemeSettings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load settings from storage on initialization
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await getLocalStorageItem(CUSTOM_THEME_STORAGE_KEY);
        if (savedSettings) {
          const parsedSettings = typeof savedSettings === 'string' ? JSON.parse(savedSettings) : savedSettings;
          setCustomSettings({ ...DEFAULT_SETTINGS, ...parsedSettings });
        }
      } catch (error) {
        logger.error('Failed to load custom theme settings:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadSettings();
  }, []);

  // Save settings to storage whenever they change
  const saveSettings = useCallback(async (settings: CustomThemeSettings) => {
    try {
      // Since setLocalStorageItem expects a string and does JSON.stringify internally,
      // we need to convert our object to a JSON string first
      await setLocalStorageItem(CUSTOM_THEME_STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      logger.error('Failed to save custom theme settings:', error);
    }
  }, []);

  // Update a specific setting
  const updateSetting = useCallback(
    <K extends keyof CustomThemeSettings>(key: K, value: CustomThemeSettings[K]) => {
      logger.info('CustomThemeProvider: Updating setting', { key, value });
      setCustomSettings((previous) => {
        const newSettings = { ...previous, [key]: value };
        saveSettings(newSettings);
        logger.info('CustomThemeProvider: Settings updated', newSettings);
        return newSettings;
      });
    },
    [saveSettings]
  );

  // Update multiple settings at once
  const updateSettings = useCallback(
    (updates: Partial<CustomThemeSettings>) => {
      setCustomSettings((previous) => {
        const newSettings = { ...previous, ...updates };
        saveSettings(newSettings);
        return newSettings;
      });
    },
    [saveSettings]
  );

  // Reset to default settings
  const resetSettings = useCallback(
    (preset?: READING_PRESET) => {
      const defaultForPreset: CustomThemeSettings = {
        ...DEFAULT_SETTINGS,
        isBoldText: preset === READING_PRESET.BOLD,
        preset: preset || READING_PRESET.ORIGINAL
      };

      setCustomSettings(defaultForPreset);
      saveSettings(defaultForPreset);

      // Force a slight delay to ensure the theme is re-applied
      setTimeout(() => {
        setCustomSettings({ ...defaultForPreset });
      }, 100);
    },
    [saveSettings]
  );

  // Apply preset-specific defaults
  const applyPresetDefaults = useCallback(
    (preset: READING_PRESET) => {
      const presetSettings: Partial<CustomThemeSettings> = {
        preset,
        isBoldText: preset === READING_PRESET.BOLD,
        // Reset certain spacing values when changing presets
        paragraphSpacing: 0,
        lineSpacing: 0,
        wordSpacing: 0,
        letterSpacing: 0
      };

      updateSettings(presetSettings);
    },
    [updateSettings]
  );

  // Generate CSS styles from current settings
  const generateCSSStyles = useCallback(() => {
    const { fontSize, fontFamily, isBoldText, paragraphSpacing, lineSpacing, wordSpacing, letterSpacing } =
      customSettings;

    const baseFontSize = Number.parseFloat(fontSize.replace('em', ''));

    return {
      fontSize: `${baseFontSize}em`,
      fontFamily, // Use the key directly - it matches what's loaded in useFonts
      fontWeight: isBoldText ? 'bold' : 'normal',
      paragraphSpacing: `${paragraphSpacing / 10}em`,
      lineHeight: `${1 + lineSpacing / 100}`,
      wordSpacing: `${wordSpacing / 10}em`,
      letterSpacing: `${letterSpacing / 100}em`
    };
  }, [customSettings]);

  // Check if current settings differ from defaults
  const hasCustomizations = useCallback(() => {
    const defaultForPreset = {
      ...DEFAULT_SETTINGS,
      isBoldText: customSettings.preset === READING_PRESET.BOLD,
      preset: customSettings.preset
    };

    return Object.keys(customSettings).some((key) => {
      const typedKey = key as keyof CustomThemeSettings;
      return customSettings[typedKey] !== defaultForPreset[typedKey];
    });
  }, [customSettings]);

  const value = useMemo(
    () => ({
      customSettings,
      isLoaded,
      updateSetting,
      updateSettings,
      resetSettings,
      applyPresetDefaults,
      generateCSSStyles,
      hasCustomizations
    }),
    [
      customSettings,
      isLoaded,
      updateSetting,
      updateSettings,
      resetSettings,
      applyPresetDefaults,
      generateCSSStyles,
      hasCustomizations
    ]
  );

  return <CustomThemeContext.Provider value={value}>{children}</CustomThemeContext.Provider>;
};

export const useCustomTheme = () => {
  const context = useContext(CustomThemeContext);
  if (context === undefined) {
    throw new Error('useCustomTheme must be used within a CustomThemeProvider');
  }
  return context;
};
