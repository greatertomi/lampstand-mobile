import { MaterialIcons } from '@expo/vector-icons';
import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme, utilities } from '../../styles';
import { PressableItem } from '../Pressable';
import { BodyText } from '../Typography';

export type ListProp = {
  icon?: ReactNode;
  title: string;
  defaultState?: string;
  variant?: 'primary' | 'secondary';
  onPress?: () => void;
};

export const List = ({ icon, title, defaultState, variant = 'primary', onPress }: ListProp) => {
  const { theme } = useTheme();
  const variantColor = variant === 'secondary' ? theme.colors.primary : theme.colors.text;

  return (
    <PressableItem style={styles.container} onPress={onPress}>
      <View style={styles.iconTitle}>
        {icon && React.cloneElement(icon as React.ReactElement, { color: variantColor })}
        <BodyText style={{ color: variantColor }}>{title}</BodyText>
      </View>
      <View style={[utilities.flex_dir_row, utilities.align_items_center]}>
        <BodyText variant="secondary">{defaultState}</BodyText>
        <MaterialIcons name="keyboard-arrow-right" size={24} color={theme.colors.text} />
      </View>
    </PressableItem>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8
  },
  iconTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  }
});
