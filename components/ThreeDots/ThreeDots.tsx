import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useTheme } from '../../styles';

type ThreeDotsProps = {
  vertical?: boolean;
  onPress?: () => void;
} & PressableProps;

export const ThreeDots = ({ onPress, vertical = false, ...rest }: ThreeDotsProps) => {
  const { theme } = useTheme();
  const name = vertical ? 'dots-three-vertical' : 'dots-three-horizontal';

  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && { opacity: 0.5 }} {...rest}>
      <Entypo name={name} size={16} color={theme.colors.text} />
    </Pressable>
  );
};
