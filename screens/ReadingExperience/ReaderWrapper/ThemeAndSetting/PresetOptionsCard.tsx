import capitalize from 'lodash/capitalize';
import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { BodyTextSmall, HeadingSmall, PressableItem } from '../../../../components';
import { READING_PRESET } from '../../../../package/epub-reader';
import { Theme, useTheme } from '../../../../styles';

type PresetStyle = {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  activeBorderColor: string;
  fontWeight: 'normal' | 'bold';
};

type PresetOptionsCard = {
  setting: string | ReactNode;
  presetType?: READING_PRESET;
  onPress?: () => void;
  currentPreset?: READING_PRESET;
};

export const PresetOptionsCard = ({
  setting,
  presetType = READING_PRESET.ORIGINAL,
  onPress,
  currentPreset
}: PresetOptionsCard) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme, presetType, currentPreset ?? READING_PRESET.ORIGINAL);

  return (
    <PressableItem onPress={onPress}>
      <View style={styles.container}>
        <HeadingSmall style={styles.settingText}>{setting}</HeadingSmall>
      </View>
      <BodyTextSmall style={styles.text}>{capitalize(presetType)}</BodyTextSmall>
    </PressableItem>
  );
};

const createStyleSheet = (theme: Theme, presetType: READING_PRESET, currentPreset: READING_PRESET) => {
  const presetStyles: Record<READING_PRESET, PresetStyle> = {
    [READING_PRESET.ORIGINAL]: {
      backgroundColor: theme.colors.background,
      textColor: theme.colors.text,
      borderColor: theme.colors.readerIconBackground,
      activeBorderColor: theme.colors.text,
      fontWeight: 'normal'
    },
    [READING_PRESET.PAPER]: {
      backgroundColor: theme.colors.paperBackground,
      textColor: theme.colors.paperText,
      borderColor: theme.colors.paperBackground,
      activeBorderColor: theme.colors.paperBorderColor,
      fontWeight: 'normal'
    },
    [READING_PRESET.BOLD]: {
      backgroundColor: theme.colors.background,
      textColor: theme.colors.text,
      borderColor: theme.colors.readerIconBackground,
      activeBorderColor: theme.colors.text,
      fontWeight: 'bold'
    }
  };

  const currentPresetColor = presetStyles[presetType];
  const isActive = presetType === currentPreset;

  return StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: isActive ? currentPresetColor.activeBorderColor : currentPresetColor.borderColor,
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
