import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { HeadingLarge } from '../../components';
import { Theme, useTheme } from '../../styles';

export const LibraryHeader = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <View style={styles.headerContainer}>
      <HeadingLarge>Library</HeadingLarge>
      <Pressable style={({ pressed }) => [styles.iconContainer, pressed && { opacity: 0.5 }]}>
        <Feather name="share" size={20} color={theme.colors.background} />
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
