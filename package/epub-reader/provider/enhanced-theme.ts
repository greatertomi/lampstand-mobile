import { TextStyle } from 'react-native';

import { READING_PRESET } from '../../types';

import { CustomThemeSettings } from './CustomThemeProvider';

type ThemeColors = {
  text: string;
  paperText: string;
  background: string;
  presetPaperBackground: string;
  [key: string]: string;
};

export const generatePreviewStyles = (
  customSettings: CustomThemeSettings,
  colors: ThemeColors,
  preset?: READING_PRESET
): TextStyle => {
  const baseFontSize = Number.parseFloat(customSettings.fontSize.replace('em', ''));
  const lineHeightMultiplier = 1 + customSettings.lineSpacing / 100;

  const color = preset === READING_PRESET.PAPER ? colors.paperText : colors.text;

  // Calculate spacing values
  const letterSpacingValue = customSettings.letterSpacing / 100;
  const wordSpacingValue = customSettings.wordSpacing / 200;

  // Use the font family key directly - it matches the loaded fonts in App.tsx
  const style: TextStyle = {
    fontSize: baseFontSize * 14,
    fontWeight: customSettings.isBoldText ? 'bold' : 'normal',
    lineHeight: lineHeightMultiplier * baseFontSize * 14,
    letterSpacing: letterSpacingValue + wordSpacingValue,
    color
  };

  // Only add fontFamily if it's not the default
  // This ensures React Native can properly load the font
  if (customSettings.fontFamily) {
    style.fontFamily = customSettings.fontFamily;
  }

  return style;
};
