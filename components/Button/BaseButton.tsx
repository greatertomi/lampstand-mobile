import React, { ReactElement, ReactNode, useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
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
  loading?: boolean;
} & PressableProps;

export const BaseButton = ({
  title,
  icon,
  onPress,
  fill,
  style,
  textStyles,
  loading = false,
  ...rest
}: ButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(loading);
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const utils = theme.utilities;

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (onPress) {
        setIsLoading(true);
        onPress(event);
      }
    },
    [onPress]
  );

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.buttonContainer, fill && utils.width_100, pressed && styles.pressed, style]}
      {...rest}
    >
      <View style={[utils.flex_dir_row, utils.align_items_center]}>
        {isLoading ? (
          <ActivityIndicator color={theme.colors.background} />
        ) : (
          <>
            {icon && <View>{icon}</View>}
            <BodyText style={[utils.text_center, textStyles]}>{title}</BodyText>
          </>
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
    }
  });
