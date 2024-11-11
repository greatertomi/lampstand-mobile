import { ReactNode } from 'react';
import { Pressable, PressableProps, View, ViewProps } from 'react-native';

type IconButtonProps = {
  children: ReactNode;
} & PressableProps &
  ViewProps;

export const IconButton = ({ children, style, ...rest }: IconButtonProps) => (
  <Pressable
    style={({ pressed }) => ({
      ...(pressed && { opacity: 0.5 })
    })}
    {...rest}
  >
    <View style={style}>{children}</View>
  </Pressable>
);
