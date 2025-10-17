import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { GestureResponderEvent, NativeSyntheticEvent, NativeTouchEvent } from 'react-native';

import { useTheme } from '../../styles';
import { PressableItem } from '../Pressable';

type ThreeDotsProps = {
  size?: number;
  vertical?: boolean;
  onPress?: (e: GestureResponderEvent | NativeSyntheticEvent<NativeTouchEvent>) => void;
};

export const ThreeDots = ({ onPress, vertical = false, size = 16 }: ThreeDotsProps) => {
  const { theme } = useTheme();
  const name = vertical ? 'dots-vertical' : 'dots-horizontal';

  // Return just the icon to avoid nested Pressable components
  // The parent component should handle the Pressable wrapping
  if (onPress) {
    return (
      <PressableItem onPress={onPress}>
        <MaterialCommunityIcons name={name} size={size} color={theme.colors.text} />
      </PressableItem>
    );
  }

  return <MaterialCommunityIcons name={name} size={size} color={theme.colors.text} />;
};
