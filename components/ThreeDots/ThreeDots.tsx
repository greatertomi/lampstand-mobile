import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { Pressable, PressableProps } from 'react-native';

import { useTheme } from '../../styles';

type ThreeDotsProps = {
  size?: number;
  vertical?: boolean;
  onPress?: () => void;
} & PressableProps;

export const ThreeDots = ({ onPress, vertical = false, size = 16, ...rest }: ThreeDotsProps) => {
  const { theme } = useTheme();
  const name = vertical ? 'dots-three-vertical' : 'dots-three-horizontal';

  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && { opacity: 0.5 }} {...rest}>
      <Entypo name={name} size={size} color={theme.colors.text} />
    </Pressable>
  );
};
