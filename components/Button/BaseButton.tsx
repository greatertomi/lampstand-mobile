import React, { ReactElement, ReactNode } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle
} from 'react-native';
import { Theme, useTheme } from '../../styles';

export type ButtonProps = {
  title: string | ReactNode;
  icon?: ReactElement;
  onClick?: (event: GestureResponderEvent) => void;
  fill?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
} & PressableProps;

export const BaseButton = ({ title, icon, onClick, fill, style, textStyles, ...rest }: ButtonProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <Pressable
      onPress={onClick}
      style={({ pressed }) => [styles.buttonContainer, fill && styles.fullWidth, pressed && styles.pressed, style]}
      {...rest}
    >
      <View style={styles.buttonContent}>
        {icon && <View>{icon}</View>}
        <Text style={[styles.title, textStyles]}>{title}</Text>
      </View>
    </Pressable>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    buttonContainer: {
      borderRadius: theme.radius.medium,
      paddingVertical: 10,
      paddingHorizontal: 24,
      borderWidth: 1,
      borderColor: theme.colors.lightGray
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      flex: 1,
      textAlign: 'center',
      fontSize: 16,
      lineHeight: 24
    },
    fullWidth: {
      width: '100%'
    },
    pressed: {
      opacity: 0.5
    }
  });
