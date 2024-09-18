import React from 'react';
import { Pressable, StyleSheet, View, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { HeadingLarge, IconButton } from '../../components';
import { Theme, useTheme, utilities } from '../../styles';
import { uploadIcon } from '../../assets';
import { useAuthState } from '../../store';

interface LibraryHeaderProps {
  activeTab: number;
  onPress: () => void;
}

export const LibraryHeader = ({ onPress, activeTab }: LibraryHeaderProps) => {
  const { isAuthenticated } = useAuthState();
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const titles = ['Homepage', 'Reading goals', 'Finished books'];

  return (
    <View style={styles.headerContainer}>
      <HeadingLarge>{titles[activeTab]}</HeadingLarge>
      <View style={[utilities.flex_dir_row, utilities.gap_1, utilities.align_items_center]}>
        {isAuthenticated && (
          <IconButton>
            <Image source={require('../../assets/images/profile.png')} style={styles.image} />
          </IconButton>
        )}
        <Pressable onPress={onPress} style={({ pressed }) => [styles.iconContainer, pressed && { opacity: 0.5 }]}>
          <SvgXml xml={uploadIcon({ color: theme.colors.background, size: 20 })} />
        </Pressable>
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
