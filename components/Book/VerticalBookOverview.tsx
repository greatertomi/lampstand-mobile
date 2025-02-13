import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Theme, useTheme } from '../../styles';
import { stripHtmlTags, formatBookProgress } from '../../utils';
import { PressableItem } from '../Pressable';
import { ThreeDots } from '../ThreeDots';
import { BodyText, BodyTextSmall, HeadingSmall, TagText } from '../Typography';

import { BookCover } from './BookCover';
import { BookOptionsModal } from './BookOptionsModal';
import { OverviewProps } from './types';

type VerticalBookOverviewProps = Omit<OverviewProps, 'size' | 'progress'>;

export const VerticalBookOverview = ({
  title,
  onPress,
  cover,
  author,
  state,
  filePath,
  mimeType,
  description
}: VerticalBookOverviewProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);
  const [isOpen, setIsOpen] = useState(false);
  const progress = formatBookProgress(state?.currentLocation?.start.percentage);

  return (
    <View style={styles.container}>
      <PressableItem onPress={onPress} style={[utils.flex_dir_row, utils.gap_1]}>
        <View style={styles.bookCover}>
          <BookCover cover={cover} />
        </View>
        <View style={styles.content}>
          <HeadingSmall numberOfLines={1} ellipsizeMode="tail">
            {title}
          </HeadingSmall>
          <BodyText style={styles.author}>{author}</BodyText>
          <TagText>{progress ?? '0%'}</TagText>
          <BodyTextSmall numberOfLines={7} ellipsizeMode="tail">
            {stripHtmlTags(description)}
          </BodyTextSmall>
        </View>
      </PressableItem>
      <ThreeDots vertical onPress={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <BookOptionsModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          bookCover={cover}
          title={title}
          author={author}
          filePath={filePath}
          mimeType={mimeType}
        />
      )}
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      position: 'relative',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
      marginTop: 16,
      height: 172
    },
    content: {
      flex: 1,
      gap: 6
    },
    author: {
      color: theme.colors.secondaryText
    },
    bookCover: {
      width: 120
    }
  });
