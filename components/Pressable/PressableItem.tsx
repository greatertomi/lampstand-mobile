import { ReactNode } from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle, GestureResponderEvent } from 'react-native';

type PressableItemProps = {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void | undefined | Promise<void>;
} & PressableProps;

export const PressableItem = ({ children, onPress, style, ...rest }: PressableItemProps) => (
  <Pressable onPress={onPress ?? undefined} style={({ pressed }) => [style, pressed && { opacity: 0.5 }]} {...rest}>
    {children}
  </Pressable>
);
