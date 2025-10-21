import { useState, useCallback, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { READING_PRESET } from '../../types';

export interface CustomThemeSettings {
  fontSize: string;
  fontFamily: string;
  boldText: boolean;
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
  boldText: false,
  paragraphSpacing: 0,
  lineSpacing: 0,
  wordSpacing: 0,
  letterSpacing: 0,
  preset: READING_PRESET.ORIGINAL
};

export const useCustomTheme = () => {
  const [customSettings, setCustomSettings] = useState<CustomThemeSettings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load settings from storage on initialization
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await AsyncStorage.getItem(CUSTOM_THEME_STORAGE_KEY);
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings);
          setCustomSettings({ ...DEFAULT_SETTINGS, ...parsedSettings });
        }
      } catch (error) {
        // Failed to load custom theme settings
      } finally {
        setIsLoaded(true);
      }
    };

    loadSettings();
  }, []);

  // Save settings to storage whenever they change
  const saveSettings = useCallback(async (settings: CustomThemeSettings) => {
    try {
      await AsyncStorage.setItem(CUSTOM_THEME_STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      // Failed to save custom theme settings
    }
  }, []);

  // Update a specific setting
  const updateSetting = useCallback(
    <K extends keyof CustomThemeSettings>(key: K, value: CustomThemeSettings[K]) => {
      setCustomSettings((previous) => {
        const newSettings = { ...previous, [key]: value };
        saveSettings(newSettings);
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
        boldText: preset === READING_PRESET.BOLD,
        preset: preset || READING_PRESET.ORIGINAL
      };

      setCustomSettings(defaultForPreset);
      saveSettings(defaultForPreset);
    },
    [saveSettings]
  );

  // Apply preset-specific defaults
  const applyPresetDefaults = useCallback(
    (preset: READING_PRESET) => {
      const presetSettings: Partial<CustomThemeSettings> = {
        preset,
        boldText: preset === READING_PRESET.BOLD,
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
    const { fontSize, fontFamily, boldText, paragraphSpacing, lineSpacing, wordSpacing, letterSpacing } =
      customSettings;

    const baseFontSize = Number.parseFloat(fontSize.replace('em', ''));

    const fontFamilyValue = fontFamily === 'plus-jakarta-sans' ? "'plus-jakarta-sans', sans-serif" : fontFamily;

    return {
      fontSize: `${baseFontSize}em`,
      fontFamily: fontFamilyValue,
      fontWeight: boldText ? 'bold' : 'normal',
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
      boldText: customSettings.preset === READING_PRESET.BOLD,
      preset: customSettings.preset
    };

    return Object.keys(customSettings).some((key) => {
      const typedKey = key as keyof CustomThemeSettings;
      return customSettings[typedKey] !== defaultForPreset[typedKey];
    });
  }, [customSettings]);

  return {
    customSettings,
    isLoaded,
    updateSetting,
    updateSettings,
    resetSettings,
    applyPresetDefaults,
    generateCSSStyles,
    hasCustomizations
  };
};

export default useCustomTheme;
