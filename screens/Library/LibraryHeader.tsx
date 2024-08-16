import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { HeadingLarge } from '../../components';
import { Theme, useTheme } from '../../styles';
import { uploadIcon } from '../../assets';

interface LibraryHeaderProps {
  onPress: () => void;
}

export const LibraryHeader = ({ onPress }: LibraryHeaderProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <View style={styles.headerContainer}>
      <HeadingLarge>Library</HeadingLarge>
      <Pressable onPress={onPress} style={({ pressed }) => [styles.iconContainer, pressed && { opacity: 0.5 }]}>
        <SvgXml xml={uploadIcon({ color: theme.colors.background, size: 20 })} />
      </Pressable>
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
    }
  });
