import React from 'react';
import { Pressable, StyleSheet, View, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HeadingLarge, IconButton } from '../../components';
import { Theme, useTheme, utilities } from '../../styles';
import { uploadIcon } from '../../assets';
import { useAuthState } from '../../store';
import { useTabConfig } from './useTabConfig';
import { getDefaultIcon } from '../../utils';
import { RootStackParamList } from '../../routes';

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
      <HeadingLarge>{titles[activeTab]}</HeadingLarge>
      <View style={[utilities.flex_dir_row, utilities.gap_1, utilities.align_items_center]}>
        <Pressable onPress={onPress} style={({ pressed }) => [styles.iconContainer, pressed && { opacity: 0.5 }]}>
          <SvgXml xml={uploadIcon({ color: theme.colors.white, size: 20 })} />
        </Pressable>
        {isAuthenticated && (
          <IconButton onPress={() => navigation.navigate('ProfileSettings')}>
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
          </IconButton>
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
