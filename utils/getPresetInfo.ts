import { READING_PRESET } from '../package/types';

const textValue =
  "At the heart of this conflict stood Lyla, a brilliant young engineer disillusioned by the Syndicate's " +
  'exploitation of temporal resources. Secretly a member of the Chrono Echoes.';

export const getPresetInfo = (preset: READING_PRESET) => {
  switch (preset) {
    case READING_PRESET.PAPER: {
      return {
        title: 'Paper',
        description: textValue
      };
    }
    case READING_PRESET.BOLD: {
      return {
        title: 'Bold',
        description: textValue
      };
    }

    default: {
      return {
        title: 'Original',
        description: textValue
      };
    }
  }
};
