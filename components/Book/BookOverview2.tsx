import React from 'react';
import {
  GestureResponderEvent,
  Image,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from 'react-native';
import { ThreeDots } from '../ThreeDots';
import { BookType } from '../../customTypes';
import { BodyText, BodyTextLarge, BodyTextSmall, TagText } from '../Typography';
import { Theme, useTheme } from '../../styles';
import { formatBookProgress } from '../../utils';

type BookOverview2Props = Omit<BookType, 'categories'> & {
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
} & PressableProps;

export const BookOverview2 = ({
  title,
  progress,
  style,
  onPress,
  image,
  author,
  description,
  ...rest
}: BookOverview2Props) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.pressed, styles.container, style]}
      {...rest}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={image} />
      </View>
      <View style={styles.content}>
        <BodyTextLarge>{title}</BodyTextLarge>
        <BodyText style={styles.author}>{author}</BodyText>
        <TagText>{formatBookProgress(progress)}</TagText>
        <BodyTextSmall>{description}</BodyTextSmall>
      </View>
      <ThreeDots vertical />
    </Pressable>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
      marginTop: 16
    },
    imageContainer: {
      marginRight: 10
    },
    content: {
      flex: 1,
      gap: 6,
      marginRight: 15
    },
    image: {
      width: 110,
      height: 162,
      borderRadius: 5,
      resizeMode: 'stretch'
    },
    desc: {
      lineHeight: 16.8
    },
    author: {
      color: theme.colors.secondaryText
    },
    pressed: {
      opacity: 0.5
    }
  });
