import { READING_PRESET } from '../../../packages/types';
import { Theme } from '../../../styles';

export const getPresetDetails = (preset: READING_PRESET, theme: Theme) => {
  const presetStyles = {
    [READING_PRESET.ORIGINAL]: {
      backgroundColor: theme.colors.border,
      textColor: theme.colors.readerIconColor
    },
    [READING_PRESET.PAPER]: {
      backgroundColor: theme.colors.presetPaperFooter,
      textColor: theme.colors.presetPaperText
    },
    [READING_PRESET.BOLD]: {
      backgroundColor: theme.colors.inactiveButtonColor,
      textColor: theme.colors.readerIconColor
    }
  };

  const backgroundColor = (() => {
    switch (preset) {
      case READING_PRESET.PAPER: {
        return theme.colors.paperBackground;
      }
      case READING_PRESET.BOLD: {
        return theme.colors.presetBoldBackground;
      }
      default: {
        return theme.colors.background;
      }
    }
  })();

  return {
    presetStyles: presetStyles[preset],
    backgroundColor
  };
};
