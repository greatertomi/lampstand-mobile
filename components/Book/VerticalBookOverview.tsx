import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { ThreeDots } from '../ThreeDots';
import { BodyText, BodyTextLarge, BodyTextSmall, TagText } from '../Typography';
import { Theme, useTheme } from '../../styles';
import { formatBookProgress } from '../../utils';
import { OverviewProps } from './types';

type VerticalBookOverviewProps = Omit<OverviewProps, 'mimeType' | 'filePath' | 'size'>;

export const VerticalBookOverview = ({
  title,
  progress,
  style,
  onPress,
  cover,
  name,
  ...rest
}: VerticalBookOverviewProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.pressed, styles.container, style]}
      {...rest}
    >
      <View style={styles.imageContainer}>{cover && <Image source={{ uri: cover }} style={styles.image} />}</View>
      <View style={styles.content}>
        <BodyTextLarge>{title}</BodyTextLarge>
        <BodyText style={styles.author}>{name}</BodyText>
        <TagText>{formatBookProgress(progress)}</TagText>
        <BodyTextSmall>
          Discover a compelling journey through the pages of this book, where every chapter brings new insights and
          adventures.
        </BodyTextSmall>
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
    author: {
      color: theme.colors.secondaryText
    },
    pressed: {
      opacity: 0.5
    }
  });
