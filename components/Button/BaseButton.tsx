import React, { ReactElement, ReactNode } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle
} from 'react-native';
import { Theme, useTheme } from '../../styles';
import { BodyText } from '../Typography';

export type ButtonProps = {
  title: string | ReactNode;
  icon?: ReactElement;
  onPress?: (event: GestureResponderEvent) => void;
  fill?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
} & PressableProps;

export const BaseButton = ({ title, icon, onPress, fill, style, textStyles, ...rest }: ButtonProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const utils = theme.utilities;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.buttonContainer, fill && styles.fullWidth, pressed && styles.pressed, style]}
      {...rest}
    >
      <View style={styles.buttonContent}>
        {icon ? (
          <View style={[utils.flex_dir_row, utils.align_items_center]}>
            <View>{icon}</View>
            <BodyText style={[styles.title, textStyles]}>{title}</BodyText>
          </View>
        ) : (
          <BodyText style={[styles.title, textStyles]}>{title}</BodyText>
        )}
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
      borderColor: theme.colors.border,
      height: 45,
      justifyContent: 'center'
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    title: {
      textAlign: 'center',
      flex: 1
    },
    fullWidth: {
      width: '100%'
    },
    pressed: {
      opacity: 0.5
    }
  });
