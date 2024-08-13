import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { ThreeDots } from '../ThreeDots';
import { BodyText, BodyTextLarge, BodyTextSmall, TagText } from '../Typography';
import { Theme, useTheme } from '../../styles';
import { cleanDescription, formatBookProgress } from '../../utils';
import { OverviewProps } from './types';

type VerticalBookOverviewProps = Omit<OverviewProps, 'mimeType' | 'filePath' | 'size'>;

export const VerticalBookOverview = ({
  title,
  progress,
  style,
  onPress,
  cover,
  author,
  description,
  ...rest
}: VerticalBookOverviewProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const cleanedDescription = cleanDescription(description);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.pressed, styles.container, style]}
      {...rest}
    >
      <View style={styles.imageContainer}>{cover && <Image source={{ uri: cover }} style={styles.image} />}</View>
      <View style={styles.content}>
        <BodyTextLarge numberOfLines={1} ellipsizeMode="tail">
          {title}
        </BodyTextLarge>
        <BodyText style={styles.author}>{author}</BodyText>
        <TagText>{formatBookProgress(progress)}</TagText>
        <BodyTextSmall numberOfLines={7} ellipsizeMode="tail">
          {cleanedDescription}
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
