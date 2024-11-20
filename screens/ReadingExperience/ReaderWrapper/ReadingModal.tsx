import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { Theme, useTheme } from '../../../styles';
import { BodyTextLarge, BodyTextSmall, DropdownPicker, IconButton } from '../../../components';
import { fontSizeSettings, readingPresetOptions, getReadingXpActions } from './readingSettingItems';
import { PresetOptionsCard } from './PresetOptionsCard';
import { FontSizeActionCard, ReadingSettingActionCard } from './ActionCards';

export const fontFamily = [
  { label: 'font 1', value: 'font 1' },
  { label: 'font 2', value: 'font 2' }
];

export type ReadingModalProps = {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
};

export const ReadingModal = ({ isVisible, setIsVisible }: ReadingModalProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);
  const readingActions = getReadingXpActions(theme);

  return (
    <Modal animationType="slide" transparent visible={isVisible}>
      <Pressable style={styles.overlay} onPress={() => setIsVisible(isVisible)} />
      <View style={styles.modalContent}>
        <View style={[utils.flex_dir_row, utils.justify_content_between]}>
          <BodyTextLarge bold>Theme & Settings</BodyTextLarge>
          <IconButton onPress={() => setIsVisible(!isVisible)}>
            <FontAwesome5 name="times-circle" size={24} color={theme.colors.text} />
          </IconButton>
        </View>
        <View>
          <View style={[utils.flex_dir_row, utils.justify_content_between]}>
            {fontSizeSettings.map((item, index) => (
              <FontSizeActionCard title={item.setting} key={index} />
            ))}
            {readingActions.map((item, index) => (
              <ReadingSettingActionCard title={item.setting} key={index} />
            ))}
          </View>
          <DropdownPicker value={fontFamily[0].value} data={fontFamily} onChange={() => {}} />
          <View style={[utils.flex_dir_row, utils.justify_content_between, utils.mt_1]}>
            {readingPresetOptions.map((item, index) => (
              <PresetOptionsCard key={index} setting={item.setting} presetType={item.presetType} />
            ))}
          </View>
          <View style={[utils.flex_dir_row, utils.align_self_center, utils.mt_1, utils.align_items_center]}>
            <BodyTextSmall bold>ALL SETTINGS</BodyTextSmall>
            <AntDesign name="right" size={20} color={theme.colors.text} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: theme.colors.overlayBackground
    },
    modalContent: {
      height: '42%',
      width: '100%',
      position: 'absolute',
      bottom: 0,
      backgroundColor: theme.colors.background,
      padding: 24,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
      gap: 28
    },
    fontSelection: {
      flexDirection: 'row',
      borderWidth: 1,
      borderRadius: 10,
      borderColor: theme.colors.text,
      padding: 12
    }
  });
