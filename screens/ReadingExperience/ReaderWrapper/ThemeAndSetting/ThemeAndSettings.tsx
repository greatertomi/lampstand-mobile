import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { flipDevice, handSlide } from '../../../../assets';
import { BodyTextLarge, BodyTextSmall, Dialog, HeadingSmall, PressableItem } from '../../../../components';
import { useReader } from '../../../../package/epub-reader';
import { useTheme } from '../../../../styles';

import { FontSizeActionCard, ReadingSettingActionCard } from './ActionCards';
import { PresetOptionsCard } from './PresetOptionsCard';
import { readingPresetOptions } from './readingSettingItems';
import { SwipeActions } from './SwipeActions';

export type ReadingModalProps = {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
};

const handleFontIncreaseAndDecrease = (fontSize: string, action: 'increase' | 'decrease'): `${string}em` => {
  const value = Number.parseFloat(fontSize);
  const minFontSize = 0.8;
  const maxFontSize = 2;
  if (Number.isNaN(value)) return '1em';
  const newValue = action === 'increase' ? Math.min(value + 0.1, maxFontSize) : Math.max(value - 0.1, minFontSize);
  return `${newValue.toFixed(1)}em`;
};

export const ThemeAndSettings = ({ isVisible, setIsVisible }: ReadingModalProps) => {
  const [isSwipeAction, setIsSwipeAction] = useState(false);
  const { theme } = useTheme();
  const utils = theme.utilities;
  const { changeFontSize, fontSize, applyPreset, currentPreset } = useReader();

  const fontSizeSettings = [
    {
      setting: <BodyTextSmall>A</BodyTextSmall>,
      onPress: () => {
        const newFontSize = handleFontIncreaseAndDecrease(fontSize, 'decrease');
        changeFontSize(newFontSize);
      }
    },
    {
      setting: <HeadingSmall>A</HeadingSmall>,
      onPress: () => {
        const newFontSize = handleFontIncreaseAndDecrease(fontSize, 'increase');
        changeFontSize(newFontSize);
      }
    }
  ];

  const readingXpActions = [
    {
      setting: <SvgXml xml={handSlide(theme.colors.text)} />,
      onPress: () => setIsSwipeAction(!isSwipeAction)
    },
    {
      setting: <SvgXml xml={flipDevice(theme.colors.text)} />,
      onPress: () => {}
    }
  ];

  return (
    <Dialog isVisible={isVisible} onClose={() => setIsVisible(isVisible)} modalHeight="32%" isOverlay>
      <View style={utils.gap_3}>
        <View style={[utils.flex_dir_row, utils.justify_content_between]}>
          <BodyTextLarge bold>Theme & Settings</BodyTextLarge>
          <PressableItem onPress={() => setIsVisible(!isVisible)}>
            <FontAwesome5 name="times-circle" size={24} color={theme.colors.text} />
          </PressableItem>
        </View>
        <View style={utils.gap_3}>
          <View style={[utils.flex_dir_row, utils.justify_content_between]}>
            {fontSizeSettings.map((item, index) => (
              <FontSizeActionCard title={item.setting} key={index} onPress={item.onPress} />
            ))}
            {readingXpActions.map((item, index) => (
              <ReadingSettingActionCard title={item.setting} key={index} onPress={item.onPress} />
            ))}
          </View>
          <View style={[utils.flex_dir_row, utils.justify_content_between, utils.mt_1]}>
            {readingPresetOptions.map((item, index) => (
              <PresetOptionsCard
                key={index}
                setting={item.setting}
                presetType={item.presetType}
                currentPreset={currentPreset}
                onPress={() => applyPreset(item.presetType)}
              />
            ))}
          </View>
        </View>
      </View>
      {isSwipeAction && <SwipeActions onClose={() => setIsSwipeAction(!isSwipeAction)} />}
    </Dialog>
  );
};
