import React, { ReactNode } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { Theme, useTheme } from '../../../styles';

type ActionCardProps = {
  title: ReactNode;
};

export const FontSizeActionCard = ({ title }: ActionCardProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  return <Pressable style={[styles.container, styles.fontContainer]}>{title}</Pressable>;
};

export const ReadingSettingActionCard = ({ title }: ActionCardProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  return <Pressable style={styles.container}>{title}</Pressable>;
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
