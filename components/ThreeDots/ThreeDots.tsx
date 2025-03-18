import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

import { useTheme } from '../../styles';
import { PressableItem } from '../Pressable';

type ThreeDotsProps = {
  size?: number;
  vertical?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPress?: (e?: any) => void;
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
