import React from 'react';
import {
  ImageSourcePropType,
  GestureResponderEvent,
  Image,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from 'react-native';
import { BodyText, HeadingSmall } from '../Typography';
import { Theme, useTheme } from '../../styles';

export type BookProps = {
  title: string;
  author: string;
  image: ImageSourcePropType;
  onClick: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
} & PressableProps;

export const Book = ({ title, author, image, onClick, style, ...rest }: BookProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed, style]}
      onPress={onClick}
      {...rest}
    >
      <View style={styles.shadow}>
        <Image style={styles.image} source={image} />
      </View>
      <View style={styles.details}>
        <HeadingSmall numberOfLines={1} ellipsizeMode="tail">
          {title}
        </HeadingSmall>
        <BodyText style={{ color: theme.colors.lightGray }}>{author}</BodyText>
      </View>
    </Pressable>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    shadow: {
      shadowColor: theme.colors.shadowColor,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      elevation: 15
    },
    container: {
      gap: 8,
      maxWidth: 100
    },
    image: {
      width: 100,
      height: 151,
      resizeMode: 'cover',
      borderRadius: 5
    },
    details: {
      gap: 2
    },
    pressed: {
      opacity: 0.5
    }
  });
