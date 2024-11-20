import { StyleSheet, View } from 'react-native';
import { ReactNode } from 'react';
import capitalize from 'lodash/capitalize';
import { BodyTextSmall, HeadingSmall, IconButton } from '../../../components';
import { Theme, useTheme } from '../../../styles';
import { READING_PRESET } from './types';

type PresetStyle = { backgroundColor: string; textColor: string; borderColor: string; fontWeight: 'normal' | 'bold' };

type PresetOptionsCard = {
  setting: string | ReactNode;
  presetType?: READING_PRESET;
};

export const PresetOptionsCard = ({ setting, presetType = READING_PRESET.ORIGINAL }: PresetOptionsCard) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme, presetType);

  return (
    <IconButton>
      <View style={styles.container}>
        <HeadingSmall style={styles.settingText}>{setting}</HeadingSmall>
      </View>
      <BodyTextSmall style={styles.text}>{capitalize(presetType)}</BodyTextSmall>
    </IconButton>
  );
};

const createStyleSheet = (theme: Theme, presetType: READING_PRESET) => {
  const presetStyles: Record<READING_PRESET, PresetStyle> = {
    [READING_PRESET.ORIGINAL]: {
      backgroundColor: theme.colors.background,
      textColor: theme.colors.text,
      borderColor: theme.colors.text,
      fontWeight: 'normal'
    },
    [READING_PRESET.PAPER]: {
      backgroundColor: theme.colors.paperBackground,
      textColor: theme.colors.paperText,
      borderColor: theme.colors.paperBorderColor,
      fontWeight: 'bold'
    },
    [READING_PRESET.QUIET]: {
      backgroundColor: theme.colors.background,
      textColor: theme.colors.text,
      borderColor: theme.colors.text,
      fontWeight: 'bold'
    }
  };

  const currentPresetColor = presetStyles[presetType];

  return StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: currentPresetColor.borderColor,
      borderRadius: 10,
      backgroundColor: currentPresetColor.backgroundColor,
      width: 100,
      height: 65,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      alignSelf: 'center',
      marginTop: 6,
      color: currentPresetColor.textColor
    },
    settingText: {
      fontWeight: currentPresetColor.fontWeight
    }
  });
};
