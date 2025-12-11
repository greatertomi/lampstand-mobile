import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { PressableItem } from '../../../../components';
import { Theme, useTheme } from '../../../../styles';

type ActionCardProps = {
  title: ReactNode;
  onPress?: () => void;
  isDisabled?: boolean;
};

export const FontSizeActionCard = ({ title, onPress, isDisabled = false }: ActionCardProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const Container = isDisabled ? View : PressableItem;

  return (
    <Container style={[styles.container, styles.fontContainer]} onPress={onPress}>
      {title}
    </Container>
  );
};

export const ReadingSettingActionCard = ({ title, onPress, isDisabled = false }: ActionCardProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  const Container = isDisabled ? View : PressableItem;
  return (
    <Container style={[styles.container, isDisabled && { opacity: 0.4 }]} {...(isDisabled ? {} : { onPress })}>
      {title}
    </Container>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.inactiveButtonColor,
      height: 40,
      minWidth: 75,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      paddingHorizontal: 10
    },

    fontContainer: {
      flexShrink: 1,
      flexGrow: 0
    }
  });
