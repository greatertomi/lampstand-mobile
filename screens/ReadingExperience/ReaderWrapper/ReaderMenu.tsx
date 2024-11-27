import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import React, { ReactNode, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BodyTextSmall, HeadingMedium, IconButton } from '../../../components';
import { Theme, useTheme } from '../../../styles';

import { ThemeAndSettings } from './ReaderFooter/ThemeAndSettings';

type MenuProps = {
  onClose: () => void;
};

export type ReaderMenusProps = {
  title?: string;
  icon?: ReactNode;
  onPress?: () => void;
};

export const ReaderMenu = ({ onClose }: MenuProps) => {
  const [shouldOpenSettings, setShouldOpenSettings] = useState<boolean>(false);
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);

  const readingMenus: ReaderMenusProps[] = [
    {
      title: 'Chapters',
      icon: <SimpleLineIcons name="list" size={24} color="black" />,
      onPress: () => {}
    },
    {
      title: 'Books & Highlight',
      icon: <Feather name="bookmark" size={24} color="black" />,
      onPress: () => {}
    },
    {
      title: 'Search Book',
      icon: <AntDesign name="search1" size={24} color="black" />,
      onPress: () => {}
    },
    {
      title: 'Theme & Settings',
      icon: <HeadingMedium>Aa</HeadingMedium>,
      onPress: () => setShouldOpenSettings(!shouldOpenSettings)
    }
  ];

  return (
    <>
      <View style={styles.menuContainer}>
        {/* TODO: Remove the cancel button when we figure out gesture handlers */}
        <MaterialIcons name="cancel" size={24} style={utils.align_self_end} onPress={onClose} />
        {readingMenus.map((menu, index) => (
          <IconButton onPress={menu.onPress} key={index}>
            <View style={styles.list}>
              <BodyTextSmall>{menu.title}</BodyTextSmall>
              {menu.icon}
            </View>
            {index !== readingMenus.length - 1 && <View style={styles.marker} />}
          </IconButton>
        ))}
      </View>
      <ThemeAndSettings
        isVisible={shouldOpenSettings}
        setIsVisible={() => setShouldOpenSettings(!shouldOpenSettings)}
      />
    </>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    menuContainer: {
      position: 'absolute',
      width: 237,
      backgroundColor: theme.colors.white,
      padding: 8,
      bottom: 60,
      right: 12,
      borderRadius: 10
    },
    list: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12
    },
    marker: {
      height: 1,
      backgroundColor: theme.colors.readerLineColor
    }
  });
