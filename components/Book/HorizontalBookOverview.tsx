import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { TrackedState } from '../../package/epub-reader';
import { getBookState } from '../../store';
import { Theme, useTheme } from '../../styles';
import { formatBookProgress, logger } from '../../utils';
import { PressableItem } from '../Pressable';
import { ThreeDots } from '../ThreeDots';
import { BodyText, HeadingSmall, TagText } from '../Typography';

import { BookCover } from './BookCover';
import { BookOptionsModal } from './BookOptionsModal';
import { OverviewProps } from './types';

export type HorizontalBookOverviewProps = Omit<OverviewProps, 'size' | 'description' | 'progress'>;

export const HorizontalBookOverview = ({
  id,
  title,
  author,
  cover,
  filePath,
  mimeType,
  onPress
}: HorizontalBookOverviewProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);
  const [isOpen, setIsOpen] = useState(false);
  const [bookState, setBookSte] = useState<TrackedState | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const savedState = await getBookState(title || '', author || '');
        setBookSte(savedState as TrackedState);
      } catch (error) {
        logger.error('Error fetching saved state:', error);
      }
    })();
  }, [title, author]);

  return (
    <View style={styles.container} key={id}>
      <PressableItem onPress={onPress}>
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
      </PressableItem>
      <View style={[utils.flex_dir_row, utils.justify_content_between, utils.align_items_center]}>
        <TagText>{formatBookProgress(bookState?.currentLocation?.start.percentage)}</TagText>
        <ThreeDots onPress={() => setIsOpen(!isOpen)} />
        {isOpen && (
          <BookOptionsModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            bookCover={cover}
            title={title}
            author={author}
            mimeType={mimeType}
            filePath={filePath}
          />
        )}
      </View>
    </View>
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
      gap: 2,
      marginTop: 4
    }
  });
