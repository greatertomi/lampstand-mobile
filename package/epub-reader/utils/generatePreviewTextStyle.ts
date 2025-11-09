import { TextStyle } from 'react-native';

import { READING_PRESET } from '../../types';
import { CustomThemeSettings } from '../provider/CustomThemeProvider';

type ThemeColors = {
  text: string;
  paperText: string;
  background: string;
  presetPaperBackground: string;
};

const FONT_SIZE_BASE = 14;

export const generatePreviewStyles = (
  customSettings: CustomThemeSettings,
  colors: ThemeColors,
  preset?: READING_PRESET
): TextStyle => {
  const fontSizeMatch = customSettings.fontSize.match(/[\d.]+/);
  const baseFontSize = fontSizeMatch ? Number.parseFloat(fontSizeMatch[0]) : 1;

  const lineHeightMultiplier = 1 + customSettings.lineSpacing / 100;
  const color = preset === READING_PRESET.PAPER ? colors.paperText : colors.text;

  const combinedSpacing = customSettings.letterSpacing / 100 + customSettings.wordSpacing / 200;

  const calculatedFontSize = baseFontSize * FONT_SIZE_BASE;

  const style: TextStyle = {
    fontSize: calculatedFontSize,
    fontWeight: customSettings.isBoldText ? 'bold' : 'normal',
    lineHeight: lineHeightMultiplier * calculatedFontSize,
    letterSpacing: combinedSpacing,
    color
  };

  if (customSettings.fontFamily) {
    style.fontFamily = customSettings.fontFamily;
  }

  return style;
};
