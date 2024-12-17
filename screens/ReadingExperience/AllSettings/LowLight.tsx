import { Entypo } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';
import { View } from 'react-native';

import { BodyText, Dialog, PreferenceList, PressableItem } from '../../../components';
import { useReader } from '../../../package/epub-reader';
import { ThemeModeScheme, useTheme } from '../../../styles';
import { ICON_SIZE } from '../../../utils';

type LowLightProps = {
  isLowLightModal: boolean;
  setIsLowLightModal: (isLowLightModal: boolean) => void;
};

export const LowLight = ({ isLowLightModal, setIsLowLightModal }: LowLightProps) => {
  const { theme, toggleTheme } = useTheme();
  const utils = theme.utilities;
  const { theme: readerTheme, changeTheme } = useReader();
  const [selectedOption, setSelectedOption] = useState<ThemeModeScheme>(readerTheme);

  const lowLights = [
    {
      title: ThemeModeScheme.Light,
      icon: <Entypo name="light-up" size={ICON_SIZE} color={theme.colors.text} />
    },
    {
      title: ThemeModeScheme.Dark,
      icon: <Ionicons name="moon-outline" size={ICON_SIZE} color={theme.colors.text} />
    },
    {
      title: ThemeModeScheme.System,
      icon: <MaterialCommunityIcons name="check-decagram-outline" size={ICON_SIZE} color={theme.colors.text} />
    }
  ];

  const handlePress = (title: ThemeModeScheme) => {
    setSelectedOption(title);
    changeTheme(title);
    toggleTheme(title);
  };

  return (
    <Dialog isVisible={isLowLightModal} isOverlay modalHeight="32%" onClose={() => setIsLowLightModal(false)}>
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
                <MaterialCommunityIcons name="check" size={ICON_SIZE} color={theme.colors.primary} />
              ) : null
            }
            isPressable
          />
        ))}
        <PressableItem onPress={() => setIsLowLightModal(!isLowLightModal)}>
          <BodyText style={[utils.align_self_center, utils.mt_1]}>Cancel</BodyText>
        </PressableItem>
      </View>
    </Dialog>
  );
};
