import { ReactNode } from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';

type IconButtonProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
} & PressableProps;

export const PressableItem = ({ children, style, ...rest }: IconButtonProps) => (
  <Pressable style={({ pressed }) => [style, pressed && { opacity: 0.5 }]} {...rest}>
    {children}
  </Pressable>
);
