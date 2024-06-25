import React, { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BodyText } from '../Typography';
import { useTheme } from '../../styles';

export type ListProp = {
  icon: ReactNode;
  title: string;
  variant?: 'primary' | 'secondary';
};

export const List = ({ icon, title, variant = 'primary' }: ListProp) => {
  const { theme } = useTheme();
  const variantColor = variant === 'secondary' ? theme.colors.primary : undefined;

  return (
    <Pressable style={({ pressed }) => [pressed && { opacity: 0.5 }, styles.container]}>
      <View style={styles.iconTitle}>
        {React.cloneElement(icon as React.ReactElement, { color: variantColor })}
        <BodyText style={{ color: variantColor }}>{title}</BodyText>
      </View>
      <MaterialIcons name="keyboard-arrow-right" size={24} color={theme.colors.text} />
    </Pressable>
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
