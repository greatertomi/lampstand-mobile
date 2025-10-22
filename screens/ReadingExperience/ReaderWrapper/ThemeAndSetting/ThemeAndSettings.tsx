import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Platform, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { handSlide, moonStar } from '../../../../assets';
import { BodyTextLarge, BodyTextSmall, Dialog, HeadingSmall, PressableItem } from '../../../../components';
import { useReader } from '../../../../package/epub-reader';
import { ScreenNavigation } from '../../../../routes/types';
import { useTheme } from '../../../../styles';

import { FontSizeActionCard, ReadingSettingActionCard } from './ActionCards';
import { PresetOptionsCard } from './PresetOptionsCard';
import { readingPresetOptions } from './readingSettingItems';
import { SwipeActions } from './SwipeActions';
import { ThemeModeSelector } from './ThemeModeSelector';

type FontSizeAction = 'increase' | 'decrease';

export type ReadingModalProps = {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
};

const handleFontIncreaseAndDecrease = (fontSize: string, action: FontSizeAction): `${string}em` => {
  const value = Number.parseFloat(fontSize);
  const minFontSize = 0.8;
  const maxFontSize = 2;
  if (Number.isNaN(value)) return '1em';
  const newValue = action === 'increase' ? Math.min(value + 0.1, maxFontSize) : Math.max(value - 0.1, minFontSize);
  return `${newValue.toFixed(1)}em`;
};

export const ThemeAndSettings = ({ isVisible, setIsVisible }: ReadingModalProps) => {
  const [isSwipeAction, setIsSwipeAction] = useState(false);
  const [isThemeAction, setIsThemeAction] = useState(false);
  const navigation = useNavigation<ScreenNavigation<'Reader'>>();
  const { theme } = useTheme();
  const utils = theme.utilities;
  const { changeFontSize, fontSize, applyPreset, preset } = useReader();

  const handleChangeFontSize = (action: FontSizeAction) => {
    const newFontSize = handleFontIncreaseAndDecrease(fontSize, action);
    changeFontSize(newFontSize);
    setIsThemeAction(false);
    setIsSwipeAction(false);
  };

  const fontSizeSettings = [
    {
      setting: <BodyTextSmall>A</BodyTextSmall>,
      onPress: () => handleChangeFontSize('decrease')
    },
    {
      setting: <HeadingSmall>A</HeadingSmall>,
      onPress: () => handleChangeFontSize('increase')
    }
  ];

  const readingXpActions = [
    {
      setting: <SvgXml xml={handSlide(theme.colors.text)} />,
      onPress: () => {
        setIsSwipeAction(!isSwipeAction);
        setIsThemeAction(false);
      },
      isDisabled: false
    },
    {
      setting: <SvgXml xml={moonStar(theme.colors.text)} />,
      onPress: () => {
        setIsThemeAction(!isThemeAction);
        setIsSwipeAction(false);
      },
      isDisabled: false
    }
  ];

  const handleCloseDialog = () => {
    setIsVisible(false);
    setIsSwipeAction(false);
    setIsThemeAction(false);
  };

  const handleOpenCustomizeTheme = () => {
    setIsVisible(false);
    navigation.navigate('CustomizeTheme', { selectedPreset: preset });
  };

  return (
    <Dialog isVisible={isVisible} onClose={handleCloseDialog} isOverlay>
      <View style={styles.container}>
        <View style={[utils.flex_dir_row, utils.justify_content_between]}>
          <BodyTextLarge bold>Theme & Settings</BodyTextLarge>
          <PressableItem onPress={handleCloseDialog}>
            <FontAwesome5 name="times-circle" size={24} color={theme.colors.text} />
          </PressableItem>
        </View>
        <View style={utils.gap_3}>
          <View style={[utils.flex_dir_row, utils.gap_1]}>
            {fontSizeSettings.map((item, index) => (
              <View style={{ flex: 1 }} key={index}>
                <FontSizeActionCard title={item.setting} onPress={item.onPress} />
              </View>
            ))}
            {readingXpActions.map((item, index) => (
              <View style={{ flex: 1 }} key={index}>
                <ReadingSettingActionCard title={item.setting} onPress={item.onPress} isDisabled={item.isDisabled} />
              </View>
            ))}
          </View>

          <View style={[utils.flex_dir_row, utils.mt_1, utils.gap_2]}>
            {readingPresetOptions.map((item, index) => (
              <View style={{ flex: 1 }} key={index}>
                <PresetOptionsCard
                  setting={item.setting}
                  presetType={item.presetType}
                  preset={preset}
                  onPress={() => applyPreset(item.presetType)}
                />
              </View>
            ))}
          </View>
          <PressableItem
            style={[
              utils.flex_dir_row,
              utils.justify_content_center,
              utils.align_items_center,
              utils.py_1,
              utils.px_1,
              utils.gap_2
            ]}
            onPress={handleOpenCustomizeTheme}
          >
            <BodyTextSmall>CUSTOMIZE THEME</BodyTextSmall>
            <FontAwesome5 name="chevron-right" size={16} color={theme.colors.text} />
          </PressableItem>
        </View>
      </View>
      {isSwipeAction && <SwipeActions onClose={() => setIsSwipeAction(!isSwipeAction)} />}
      {isThemeAction && <ThemeModeSelector onClose={() => setIsThemeAction(!isThemeAction)} />}
    </Dialog>
  );
};

const styles = {
  container: {
    gap: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16
  }
};
