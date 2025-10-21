import { TextStyle } from 'react-native';

import { READING_PRESET } from '../../types';
import { CustomThemeSettings } from '../hooks/useCustomTheme';

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

  return {
    fontSize: baseFontSize * 14,
    fontWeight: customSettings.isBoldText ? 'bold' : 'normal',
    lineHeight: lineHeightMultiplier * baseFontSize * 14,
    letterSpacing: customSettings.letterSpacing / 100 + customSettings.wordSpacing / 200,
    fontFamily: customSettings.fontFamily === 'plus-jakarta-sans' ? 'System' : customSettings.fontFamily,
    color
  };
};
