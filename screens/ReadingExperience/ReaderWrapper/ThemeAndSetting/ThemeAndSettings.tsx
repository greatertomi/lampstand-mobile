import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Platform, View } from 'react-native';
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
  const { changeFontSize, fontSize, applyPreset, preset } = useReader();

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
      onPress: () => setIsSwipeAction(!isSwipeAction),
      isDisabled: false
    },
    {
      setting: <SvgXml xml={flipDevice(theme.colors.neutralGrey)} />,
      onPress: () => {},
      isDisabled: true
    }
  ];

  return (
    <Dialog isVisible={isVisible} onClose={() => setIsVisible(isVisible)} isOverlay>
      <View style={styles.container}>
        <View style={[utils.flex_dir_row, utils.justify_content_between]}>
          <BodyTextLarge bold>Theme & Settings</BodyTextLarge>
          <PressableItem onPress={() => setIsVisible(!isVisible)}>
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
                  key={index}
                  setting={item.setting}
                  presetType={item.presetType}
                  preset={preset}
                  onPress={() => applyPreset(item.presetType)}
                />
              </View>
            ))}
          </View>
        </View>
      </View>
      {isSwipeAction && <SwipeActions onClose={() => setIsSwipeAction(!isSwipeAction)} />}
    </Dialog>
  );
};

const styles = {
  container: {
    gap: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16
  }
};
