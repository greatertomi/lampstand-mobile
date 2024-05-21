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

export const BaseButton = ({ title, icon, onPress, fill, style, textStyles, disabled, ...rest }: ButtonProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const utils = theme.utilities;
  const disabledStyle = disabled && styles.disable;

  return (
    <Pressable
      onPress={disabled ? null : onPress}
      style={({ pressed }) => [
        styles.buttonContainer,
        disabled && disabledStyle,
        fill && utils.width_100,
        pressed && !disabled && styles.pressed,
        style
      ]}
      {...rest}
    >
      <View>
        {icon ? (
          <View style={[utils.flex_dir_row, utils.align_items_center]}>
            <View>{icon}</View>
            <BodyText style={[textStyles, disabled && styles.disabledText]}>{title}</BodyText>
          </View>
        ) : (
          <BodyText style={[utils.text_center, textStyles, disabled && styles.disabledText]}>{title}</BodyText>
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
      borderWidth: 1,
      borderColor: theme.colors.border,
      height: 45,
      justifyContent: 'center',
      alignItems: 'center'
    },
    pressed: {
      opacity: 0.5
    },
    disable: {
      opacity: 0.5
    },
    disabledText: {
      color: theme.colors.passwordRule
    }
  });
