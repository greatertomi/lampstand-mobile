import React, { ReactNode } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { Theme, useTheme } from '../../../styles';

type ActionCardProps = {
  title: ReactNode;
  onPress?: () => void;
};

export const FontSizeActionCard = ({ title, onPress }: ActionCardProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  return (
    <Pressable
      style={({ pressed }) => [styles.container, styles.fontContainer, ...(pressed ? [{ opacity: 0.5 }] : [])]}
      onPress={onPress}
    >
      {title}
    </Pressable>
  );
};

export const ReadingSettingActionCard = ({ title, onPress }: ActionCardProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {title}
    </Pressable>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.secondaryBackgroundDark,
      width: 75,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 15
    },
    fontContainer: {
      width: 90
    }
  });
