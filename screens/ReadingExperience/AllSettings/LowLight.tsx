import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { BodyText, PressableItem } from '../../../components';
import { useReader } from '../../../package/epub-reader';
import { Theme, ThemeModeScheme, useTheme } from '../../../styles';

import { PreferenceList } from './PreferenceList';

type LowLightProps = {
  isLowLightModal: boolean;
  setIsLowLightModal: (isLowLightModal: boolean) => void;
};

export const LowLight = ({ isLowLightModal, setIsLowLightModal }: LowLightProps) => {
  const { theme, toggleTheme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);
  const { theme: readerTheme, changeTheme } = useReader();
  const [selectedOption, setSelectedOption] = useState<ThemeModeScheme>(readerTheme);

  const lowLights = [
    {
      title: ThemeModeScheme.Light,
      icon: <Entypo name="light-up" size={24} color={theme.colors.text} />
    },
    {
      title: ThemeModeScheme.Dark,
      icon: <Ionicons name="moon-outline" size={24} color={theme.colors.text} />
    },
    {
      title: ThemeModeScheme.System,
      icon: <MaterialCommunityIcons name="check-decagram-outline" size={24} color={theme.colors.text} />
    }
  ];

  const handlePress = (title: ThemeModeScheme) => {
    setSelectedOption(title);
    changeTheme(title);
    toggleTheme(title);
  };

  return (
    <Modal animationType="slide" transparent visible={isLowLightModal}>
      <Pressable style={styles.overlay} onPress={() => setIsLowLightModal(false)} />
      <View style={styles.modalContent}>
        <View style={[utils.justify_content_between, utils.mt_2]}>
          {lowLights.map((item, index) => (
            <PreferenceList
              key={index}
              hasLeftIcon
              leftIcon={item.icon}
              title={item.title}
              hasUnderline={index !== lowLights.length - 1}
              onPress={() => handlePress(item.title)}
              rightElement={
                selectedOption === item.title ? (
                  <MaterialCommunityIcons name="check" size={24} color={theme.colors.primary} />
                ) : null
              }
              isPressable
            />
          ))}
          <PressableItem onPress={() => setIsLowLightModal(!isLowLightModal)}>
            <BodyText style={[utils.align_self_center, utils.mt_1]}>Cancel</BodyText>
          </PressableItem>
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
      height: '26%',
      width: '100%',
      position: 'absolute',
      bottom: 0,
      backgroundColor: theme.colors.background,
      paddingHorizontal: 24,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
      gap: 16
    }
  });
