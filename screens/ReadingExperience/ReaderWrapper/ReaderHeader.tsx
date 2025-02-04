import { Feather, MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useNavigation } from '@react-navigation/native';
import React, { useState, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { BodyTextSmall, HeadingMedium, PressableItem, ThreeDots } from '../../../components';
import { useReader } from '../../../package/epub-reader';
import { ScreenNavigation } from '../../../routes';
import { Theme, useTheme } from '../../../styles';

import { ThemeAndSettings } from './ThemeAndSetting';

type ReaderHeaderProps = {
  bookTitle: string;
};

type ReaderMenusProps = {
  title: string;
  icon: ReactNode;
  onPress: () => void;
};

export const ReaderHeader = ({ bookTitle }: ReaderHeaderProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const utils = theme.utilities;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shouldOpenSettings, setShouldOpenSettings] = useState<boolean>(false);

  const { addBookmark, removeBookmark, isBookmarked } = useReader();
  const navigation = useNavigation<ScreenNavigation<'Bookmarks'>>();

  const handleOnPress = () => {
    if (isBookmarked) {
      removeBookmark();
    } else {
      addBookmark();
    }
  };

  const readingMenus: ReaderMenusProps[] = [
    {
      title: 'Chapters',
      icon: <SimpleLineIcons name="list" size={24} color="black" />,
      onPress: () => navigation.navigate('TableOfContent')
    },
    {
      title: 'Books & Highlight',
      icon: <Feather name="bookmark" size={24} color="black" />,
      onPress: () => navigation.navigate('Bookmarks')
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
      <View style={styles.headerContainer}>
        <View style={[utils.flex, utils.align_items_start]}>
          <PressableItem style={styles.rounded} onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={16} color={theme.colors.text} />
          </PressableItem>
        </View>

        <View style={[utils.flex, utils.align_items_center]}>
          <BodyTextSmall variant="secondary">{bookTitle}</BodyTextSmall>
        </View>

        <View
          style={[utils.flex, utils.flex_dir_row, utils.gap_2, utils.align_items_center, utils.justify_content_end]}
        >
          <PressableItem onPress={handleOnPress}>
            <MaterialIcons
              name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
              size={28}
              color={isBookmarked ? theme.colors.primary : theme.colors.text}
            />
          </PressableItem>
          <PressableItem style={styles.rounded} onPress={() => setIsMenuOpen(!isMenuOpen)}>
            <ThreeDots vertical onPress={() => setIsMenuOpen(!isMenuOpen)} />
          </PressableItem>
        </View>
      </View>
      <View style={styles.menuContainer}>
        {isMenuOpen &&
          readingMenus.map((menu, index) => (
            <PressableItem
              onPress={() => {
                menu.onPress();
                setIsMenuOpen(!isMenuOpen);
              }}
              key={index}
            >
              <View style={styles.list}>
                <BodyTextSmall>{menu.title}</BodyTextSmall>
                {menu.icon}
              </View>
              {index !== readingMenus.length - 1 && <View style={styles.marker} />}
            </PressableItem>
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
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 54,
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.background
    },
    rounded: {
      borderWidth: 1,
      borderRadius: 50,
      padding: 8,
      borderColor: theme.colors.tertiaryText
    },
    menuContainer: {
      position: 'absolute',
      width: 237,
      backgroundColor: theme.colors.white,
      padding: 8,
      top: 100,
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
