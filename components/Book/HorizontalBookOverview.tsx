import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Theme, useTheme } from '../../styles';
import { formatBookProgress, ICON_SIZE } from '../../utils';
import { PressableItem } from '../Pressable';
import { ThreeDots } from '../ThreeDots';
import { BodyTextSmall, TagText } from '../Typography';

import { BookCover } from './BookCover';
import { BookOptionModal } from './BookOptionModal';
import { OverviewProps } from './types';

export type HorizontalBookOverviewProps = Omit<OverviewProps, 'size' | 'description'>;

export const HorizontalBookOverview = ({
  id,
  title,
  author,
  cover,
  state,
  mimeType,
  filePath,
  isFinished,
  onPress
}: HorizontalBookOverviewProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);
  const [isOpen, setIsOpen] = useState(false);
  const stateProgress = formatBookProgress(state?.currentLocation?.end.percentage);

  return (
    <View style={styles.container} key={id}>
      <PressableItem onPress={onPress}>
        <View style={styles.shadow}>
          <BookCover cover={cover} />
        </View>
        <View style={styles.details}>
          <BodyTextSmall numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
            {title}
          </BodyTextSmall>
          <TagText numberOfLines={1} variant="secondary" ellipsizeMode="tail" style={styles.author}>
            {author}
          </TagText>
        </View>
      </PressableItem>
      <View style={[utils.flex_dir_row, utils.justify_content_between, utils.align_items_center, styles.footer]}>
        <TagText>{stateProgress ?? '0%'}</TagText>
        <ThreeDots onPress={() => setIsOpen(!isOpen)} size={ICON_SIZE} />
      </View>
      {isOpen && (
        <BookOptionModal
          id={id}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          cover={cover}
          title={title}
          filePath={filePath}
          mimeType={mimeType}
          author={author}
          isFinished={isFinished}
        />
      )}
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    shadow: {
      shadowColor: theme.colors.border,
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      aspectRatio: 2 / 3
    },
    container: {
      gap: 8,
      marginTop: 16,
      width: '33.33%',
      paddingHorizontal: 4
    },
    details: {
      gap: 2,
      marginTop: 4,
      minHeight: 45
    },
    title: {
      lineHeight: 16
    },
    author: {
      lineHeight: 14
    },
    footer: {
      marginTop: 4,
      minHeight: 24
    }
  });
