import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { Theme, useTheme, utilities } from '../../styles';
import { formatBookProgress } from '../../utils';
import { ThreeDots } from '../ThreeDots';
import { BodyText, HeadingSmall, TagText } from '../Typography';

import { EmptyBookCover } from './EmptyBookCover';
import { OverviewProps } from './types';

export type HorizontalBookOverviewProps = Omit<OverviewProps, 'filePath' | 'size' | 'mimeType' | 'description'>;

export const HorizontalBookOverview = ({
  id,
  title,
  author,
  cover,
  progress,
  onPress,
  style
}: HorizontalBookOverviewProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <Pressable style={({ pressed }) => [styles.container, pressed && styles.pressed, style]} onPress={onPress} key={id}>
      <View style={styles.shadow}>
        {cover ? <Image source={{ uri: cover }} style={styles.image} /> : <EmptyBookCover />}
      </View>
      <View style={styles.details}>
        <HeadingSmall numberOfLines={1} ellipsizeMode="tail">
          {title}
        </HeadingSmall>
        <BodyText numberOfLines={1} ellipsizeMode="tail" style={styles.author}>
          {author}
        </BodyText>
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
      height: 160
    },
    container: {
      gap: 8,
      marginTop: 16,
      width: '31%'
    },
    image: {
      width: '100%',
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
