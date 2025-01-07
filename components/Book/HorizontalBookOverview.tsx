import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Theme, useTheme } from '../../styles';
import { formatBookProgress } from '../../utils';
import { PressableItem } from '../Pressable';
import { ThreeDots } from '../ThreeDots';
import { BodyText, HeadingSmall, TagText } from '../Typography';

import { BookCover } from './BookCover';
import { OverviewProps } from './types';

export type HorizontalBookOverviewProps = Omit<OverviewProps, 'filePath' | 'size' | 'mimeType' | 'description'>;

export const HorizontalBookOverview = ({
  id,
  title,
  author,
  cover,
  progress,
  onPress
}: HorizontalBookOverviewProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);

  return (
    <PressableItem style={styles.container} onPress={onPress} key={id}>
      <View style={styles.shadow}>
        <BookCover cover={cover} />
      </View>
      <View style={styles.details}>
        <HeadingSmall numberOfLines={1} ellipsizeMode="tail">
          {title}
        </HeadingSmall>
        <BodyText numberOfLines={1} variant="secondary" ellipsizeMode="tail">
          {author}
        </BodyText>
      </View>
      <View style={[utils.flex_dir_row, utils.justify_content_between, utils.align_items_center]}>
        <TagText>{formatBookProgress(progress)}</TagText>
        <ThreeDots />
      </View>
    </PressableItem>
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
      width: '33.33%',
      paddingHorizontal: 4
    },
    details: {
      gap: 2
    }
  });
