import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Theme, useTheme } from '../../styles';
import { formatBookProgress } from '../../utils';
import { PressableItem } from '../Pressable';
import { ThreeDots } from '../ThreeDots';
import { BodyText, HeadingSmall, TagText } from '../Typography';

import { BookCover } from './BookCover';
import { BookOptionsModal } from './BookOptionsModal';
import { OverviewProps } from './types';

export type HorizontalBookOverviewProps = Omit<OverviewProps, 'filePath' | 'size' | 'mimeType' | 'description'>;

export const HorizontalBookOverview = ({
  id,
  title,
  author,
  cover,
  state,
  progress,
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
          <HeadingSmall numberOfLines={1} ellipsizeMode="tail">
            {title}
          </HeadingSmall>
          <BodyText numberOfLines={1} variant="secondary" ellipsizeMode="tail">
            {author}
          </BodyText>
        </View>
      </PressableItem>
      <View style={[utils.flex_dir_row, utils.justify_content_between, utils.align_items_center]}>
        <TagText>{stateProgress ?? '0%'}</TagText>
        <ThreeDots onPress={() => setIsOpen(!isOpen)} />
        {isOpen && (
          <BookOptionsModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            cover={cover}
            title={title}
            author={author}
            progress={progress}
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
