import { ReactNode } from 'react';
import { Pressable, PressableProps } from 'react-native';

type IconButtonProps = {
  children: ReactNode;
} & PressableProps;

export const IconButton = ({ children, style, ...rest }: IconButtonProps) => (
  <Pressable
    style={({ pressed }) => ({
      style,
      ...(pressed && { opacity: 0.5 })
    })}
    {...rest}
  >
    {children}
  </Pressable>
);
