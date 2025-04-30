import capitalize from 'lodash/capitalize';
import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { BodyTextSmall, HeadingSmall, PressableItem } from '../../../../components';
import { READING_PRESET } from '../../../../package/types';
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
  preset?: READING_PRESET;
};

export const PresetOptionsCard = ({
  setting,
  presetType = READING_PRESET.ORIGINAL,
  onPress,
  preset
}: PresetOptionsCard) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme, presetType, preset ?? READING_PRESET.ORIGINAL);

  return (
    <PressableItem onPress={onPress}>
      <View style={styles.container}>
        <HeadingSmall style={styles.settingText}>{setting}</HeadingSmall>
      </View>
      <BodyTextSmall style={styles.text}>{capitalize(presetType)}</BodyTextSmall>
    </PressableItem>
  );
};

const createStyleSheet = (theme: Theme, presetType: READING_PRESET, preset: READING_PRESET) => {
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

  const presetColor = presetStyles[presetType];
  const isActive = presetType === preset;

  return StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: isActive ? presetColor.activeBorderColor : presetColor.borderColor,
      borderRadius: 10,
      backgroundColor: presetColor.backgroundColor,
      width: 100,
      height: 65,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      alignSelf: 'center',
      marginTop: 6,
      color: presetColor.textColor
    },
    settingText: {
      fontWeight: presetColor.fontWeight
    }
  });
};
