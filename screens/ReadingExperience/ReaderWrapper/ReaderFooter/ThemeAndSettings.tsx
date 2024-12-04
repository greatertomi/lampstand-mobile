import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { flipDevice, handSlide } from '../../../../assets';
import { BodyTextLarge, BodyTextSmall, HeadingSmall, PressableItem } from '../../../../components';
import { useReader } from '../../../../package/epub-reader';
import { ScreenNavigation } from '../../../../routes';
import { Theme, useTheme } from '../../../../styles';

import { FontSizeActionCard, ReadingSettingActionCard } from './ActionCards';
import { PresetOptionsCard } from './PresetOptionsCard';
import { readingPresetOptions } from './readingSettingItems';
import { SwipeActions } from './SwipeActions';
import { useNavigation } from '@react-navigation/native';
import { ScreenNavigation } from '../../../../routes';

export type ReadingModalProps = {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
};

const handleFontIncreaseAndDecrease = (fontSize: string, action: 'increase' | 'decrease'): `${number}em` => {
  const value = Number.parseFloat(fontSize);
  const minFontSize = 0.8;
  const maxFontSize = 2;
  if (Number.isNaN(value)) return '1em';
  const newValue = action === 'increase' ? Math.min(value + 0.1, maxFontSize) : Math.max(value - 0.1, minFontSize);
  return `${newValue}em`;
};

export const ThemeAndSettings = ({ isVisible, setIsVisible }: ReadingModalProps) => {
  const [isSwipeAction, setIsSwipeAction] = useState(false);
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);
  const { changeFontSize, fontSize } = useReader();
  const navigation = useNavigation<ScreenNavigation<'Login'>>();

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
      setting: <SvgXml xml={handSlide} />,
      onPress: () => setIsSwipeAction(!isSwipeAction)
    },
    {
      setting: <SvgXml xml={flipDevice(theme.colors.text)} />,
      onPress: () => {}
    }
  ];

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent visible={isVisible}>
        <Pressable style={styles.overlay} onPress={() => setIsVisible(isVisible)} />
        <View style={styles.modalContent}>
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
                <PresetOptionsCard key={index} setting={item.setting} presetType={item.presetType} />
              ))}
            </View>
            <PressableItem
              onPress={() => {
                navigation.navigate('ReaderPreferences');
                setIsVisible(isVisible);
              }}
              style={[utils.flex_dir_row, utils.align_self_center, utils.align_items_center]}
            >
              <BodyTextSmall bold>ALL SETTINGS</BodyTextSmall>
              <AntDesign name="right" size={20} color={theme.colors.text} />
            </PressableItem>
          </View>
        </View>
        {isSwipeAction && <SwipeActions />}
      </Modal>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      position: 'relative'
    },
    overlay: {
      flex: 1,
      backgroundColor: theme.colors.overlayBackground
    },
    modalContent: {
      height: '34%',
      width: '100%',
      position: 'absolute',
      bottom: 0,
      backgroundColor: theme.colors.background,
      padding: 24,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
      gap: 28
    }
  });
