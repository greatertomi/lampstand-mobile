import { ReactNode } from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';

type PressableItemProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
} & PressableProps;

export const PressableItem = ({ children, style, ...rest }: PressableItemProps) => (
  <Pressable style={({ pressed }) => [style, pressed && { opacity: 0.5 }]} {...rest}>
    {children}
  </Pressable>
);
