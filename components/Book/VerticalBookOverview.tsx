import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Theme, useTheme } from '../../styles';
import { stripHtmlTags, formatBookProgress } from '../../utils';
import { PressableItem } from '../Pressable';
import { ThreeDots } from '../ThreeDots';
import { BodyText, BodyTextLarge, BodyTextSmall, TagText } from '../Typography';

import { BookCover } from './BookCover';
import { BookOptionsModal } from './BookOptionsModal';
import { OverviewProps } from './types';

type VerticalBookOverviewProps = Omit<OverviewProps, 'mimeType' | 'filePath' | 'size'>;

export const VerticalBookOverview = ({
  title,
  progress,
  onPress,
  cover,
  author,
  description
}: VerticalBookOverviewProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      <PressableItem onPress={onPress} style={[utils.flex_dir_row, utils.gap_1]}>
        <View style={styles.bookCover}>
          <BookCover cover={cover} />
        </View>
        <View style={styles.content}>
          <BodyTextLarge numberOfLines={1} ellipsizeMode="tail">
            {title}
          </BodyTextLarge>
          <BodyText style={styles.author}>{author}</BodyText>
          <TagText>{formatBookProgress(progress)}</TagText>
          <BodyTextSmall numberOfLines={7} ellipsizeMode="tail">
            {stripHtmlTags(description)}
          </BodyTextSmall>
        </View>
      </PressableItem>
      <ThreeDots vertical onPress={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <BookOptionsModal isOpen={isOpen} setIsOpen={setIsOpen} bookCover={cover} title={title} author={author} />
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
