import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Theme, useTheme } from '../../../styles';
import { BodyText, BodyTextLarge, BodyTextSmall, IconButton } from '../../../components';
import { FontSettings, ReadingMode } from './readingSettingItems';
import { SettingsCard } from './SettingsCard';
import { ModalProps } from './ReadingWrapperTypes';

export const ReadingModal = ({ isVisible, setIsVisible }: ModalProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);
  const fonts = FontSettings(theme);
  const readingModes = ReadingMode(theme);

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
        <View style={utils.gap_2}>
          <View style={[utils.flex_dir_row, utils.justify_content_between]}>
            {fonts.map((item, index) => (
              <SettingsCard key={index} setting={item.setting} backgroundColor={item.backgroundColor} />
            ))}
          </View>
          <IconButton style={[styles.fontSelection, utils.align_items_center, utils.justify_content_between]}>
            <View style={utils.gap_1}>
              <BodyTextSmall variant="secondary">Fonts</BodyTextSmall>
              <BodyText>Untitled</BodyText>
            </View>
            <AntDesign name="right" size={20} color={theme.colors.text} />
          </IconButton>
          <View style={[utils.flex_dir_row, utils.justify_content_between]}>
            {readingModes.map((item, index) => (
              <SettingsCard
                key={index}
                setting={item.setting}
                title={item.title}
                backgroundColor={item.backgroundColor}
              />
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
