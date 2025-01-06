import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

import { useTheme } from '../../styles';
import { PressableItem } from '../Pressable';

type ThreeDotsProps = {
  size?: number;
  vertical?: boolean;
  onPress?: () => void;
};

export const ThreeDots = ({ onPress, vertical = false, size = 16 }: ThreeDotsProps) => {
  const { theme } = useTheme();
  const name = vertical ? 'dots-vertical' : 'dots-horizontal';

  return (
    <PressableItem onPress={onPress}>
      <MaterialCommunityIcons name={name} size={size} color={theme.colors.text} />
    </PressableItem>
  );
};
