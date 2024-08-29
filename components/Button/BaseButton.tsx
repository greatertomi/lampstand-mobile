import React, { ReactElement, ReactNode, useCallback } from 'react';
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
import { BodyText, TagText } from '../Typography';

export type ButtonProps = {
  title: string | ReactNode;
  icon?: ReactElement;
  onPress?: (event: GestureResponderEvent) => void;
  fill?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
  loading?: boolean;
  description?: string;
} & PressableProps;

export const BaseButton = ({
  title,
  icon,
  onPress,
  fill,
  style,
  textStyles,
  loading = false,
  description,
  ...rest
}: ButtonProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const utils = theme.utilities;
  const disabledStyle = loading && styles.disable;

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (onPress) {
        onPress(event);
      }
    },
    [onPress]
  );

  return (
    <Pressable
      onPress={loading ? null : handlePress}
      style={({ pressed }) => [
        styles.buttonContainer,
        loading && disabledStyle,
        fill && utils.width_100,
        pressed && !loading && styles.pressed,
        style
      ]}
      {...rest}
    >
      <View style={[utils.flex_dir_row, utils.align_items_center, utils.gap_1]}>
        {icon && <View>{icon}</View>}
        <BodyText style={textStyles}>{title}</BodyText>
      </View>
      {description && <TagText style={styles.description}>{description}</TagText>}
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
    description: {
      color: theme.colors.background
    }
  });
