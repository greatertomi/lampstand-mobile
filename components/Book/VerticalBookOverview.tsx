import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { Theme, useTheme } from '../../styles';
import { stripHtmlTags, formatBookProgress } from '../../utils';
import { ThreeDots } from '../ThreeDots';
import { BodyText, BodyTextLarge, BodyTextSmall, TagText } from '../Typography';

import { BookOptionsModal } from './BookOptionsModal';
import { OverviewProps } from './types';

type VerticalBookOverviewProps = Omit<OverviewProps, 'mimeType' | 'filePath' | 'size'>;

export const VerticalBookOverview = ({
  title,
  progress,
  style,
  onPress,
  cover,
  author,
  description
}: VerticalBookOverviewProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Pressable onPress={onPress} style={({ pressed }) => [pressed && styles.pressed, styles.container, style]}>
        <View style={styles.imageContainer}>{cover && <Image source={{ uri: cover }} style={styles.image} />}</View>
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
        <ThreeDots vertical onPress={() => setIsOpen(!isOpen)} />
      </Pressable>
      {isOpen && (
        <BookOptionsModal isOpen={isOpen} setIsOpen={setIsOpen} bookCover={cover} title={title} author={author} />
      )}
    </>
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
      height: '100%',
      borderRadius: 5,
      resizeMode: 'stretch'
    },
    author: {
      color: theme.colors.secondaryText
    },
    pressed: {
      opacity: 0.5
    }
  });
