import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { uploadIcon } from '../../assets';
import { HeadingLarge, PressableItem } from '../../components';
import { RootStackParamList } from '../../routes';
import { useAuthState } from '../../store';
import { Theme, useTheme, utilities } from '../../styles';
import { getDefaultIcon } from '../../utils';

import { useTabConfig } from './useTabConfig';

interface LibraryHeaderProps {
  activeTab: number;
  hasFinishedBooks: boolean;
  onPress: () => void;
}

type LibraryHeaderNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProfileSettings'>;

export const LibraryHeader = ({ onPress, hasFinishedBooks, activeTab }: LibraryHeaderProps) => {
  const { isAuthenticated, user } = useAuthState();
  const { theme } = useTheme();
  const navigation = useNavigation<LibraryHeaderNavigationProp>();
  const styles = createStyleSheet(theme);
  const { titles } = useTabConfig(hasFinishedBooks);

  return (
    <View style={styles.headerContainer}>
      <HeadingLarge bold>{titles[activeTab]}</HeadingLarge>
      <View style={[utilities.flex_dir_row, utilities.gap_1, utilities.align_items_center]}>
        <PressableItem onPress={onPress} style={styles.iconContainer}>
          <SvgXml xml={uploadIcon({ color: theme.colors.white, size: 20 })} />
        </PressableItem>
        {isAuthenticated && (
          <PressableItem onPress={() => navigation.navigate('ProfileSettings')}>
            {user?.profilePicture ? (
              <Image source={{ uri: user?.profilePicture }} style={styles.image} />
            ) : (
              <SvgXml
                xml={getDefaultIcon({
                  id: user?.id,
                  size: 40
                })}
              />
            )}
          </PressableItem>
        )}
      </View>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      top: 31,
      height: 74
    },
    iconContainer: {
      backgroundColor: theme.colors.primary,
      width: 38,
      height: 35,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center'
    },
    image: {
      width: 39,
      height: 39,
      borderRadius: 20
    }
  });
