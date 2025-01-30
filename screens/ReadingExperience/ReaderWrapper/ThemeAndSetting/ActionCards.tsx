import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';

import { PressableItem } from '../../../../components';
import { Theme, useTheme } from '../../../../styles';

type ActionCardProps = {
  title: ReactNode;
  onPress?: () => void;
};

export const FontSizeActionCard = ({ title, onPress }: ActionCardProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  return (
    <PressableItem style={[styles.container, styles.fontContainer]} onPress={onPress}>
      {title}
    </PressableItem>
  );
};

export const ReadingSettingActionCard = ({ title, onPress }: ActionCardProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  return (
    <PressableItem style={styles.container} onPress={onPress}>
      {title}
    </PressableItem>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.inactiveButtonColor,
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
