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
import { BodyText, HeadingSmall, TagText } from '../Typography';
import { Theme, useTheme, utilities } from '../../styles';
import { BookType } from '../../customTypes';
import { formatBookProgress } from '../../utils';
import { ThreeDots } from '../ThreeDots';

export type BookOverviewProps = Omit<BookType, 'categories' | 'description'> & {
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
} & PressableProps;

export const BookOverview = ({ id, title, author, image, progress, onPress, style, ...rest }: BookOverviewProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed, style]}
      onPress={onPress}
      key={id}
      {...rest}
    >
      <View style={styles.shadow}>
        <Image style={styles.image} source={image} />
      </View>
      <View style={styles.details}>
        <HeadingSmall numberOfLines={1} ellipsizeMode="tail">
          {title}
        </HeadingSmall>
        <BodyText style={styles.author}>{author}</BodyText>
      </View>
      <View style={[utilities.flex_dir_row, utilities.justify_content_between, utilities.align_items_center]}>
        <TagText>{formatBookProgress(progress)}</TagText>
        <ThreeDots />
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
      maxWidth: 116,
      marginTop: 16
    },
    image: {
      width: 116,
      height: 160,
      resizeMode: 'stretch',
      borderRadius: 5
    },
    author: {
      color: theme.colors.secondaryText
    },
    details: {
      gap: 2
    },
    pressed: {
      opacity: 0.5
    }
  });
