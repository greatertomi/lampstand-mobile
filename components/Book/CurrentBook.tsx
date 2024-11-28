import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';

import { Theme, useTheme } from '../../styles';
import { PressableItem } from '../Pressable';
import { ProgressBar } from '../ProgressBar';
import { ThreeDots } from '../ThreeDots';
import { BodyText, BodyTextSmall } from '../Typography';

import { CategoryTag } from './CategoryTag';

export type BookDetailsProps = {
  title: string;
  author: string;
  image: ImageSourcePropType;
  categories: string[];
  progress: number;
};

export const CurrentBook = ({ title, author, image, categories, progress }: BookDetailsProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);

  return (
    <View style={styles.shadow}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={image} />
        </View>
        <View style={styles.detailContainer}>
          <View style={[utils.flex_dir_row, utils.justify_content_between, utils.align_items_center]}>
            <View style={styles.titleDesc}>
              <BodyText bold numberOfLines={1} ellipsizeMode="tail">
                {title}
              </BodyText>
              <BodyTextSmall style={styles.author} numberOfLines={1} ellipsizeMode="tail">
                by {author}
              </BodyTextSmall>
            </View>
            <View>
              <PressableItem>
                <ThreeDots vertical />
              </PressableItem>
            </View>
          </View>
          <View style={[utils.flex_dir_row, utils.gap_1, utils.wrap]}>
            <CategoryTag categories={categories} />
          </View>
          <View style={[utils.flex_dir_row, utils.gap_1]}>
            <ProgressBar progress={progress} />
          </View>
        </View>
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
      elevation: 1
    },
    container: {
      flexDirection: 'row',
      height: 164,
      borderWidth: 1,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      borderColor: theme.colors.cardBorderColor
    },
    imageContainer: {
      width: '31%'
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'stretch',
      borderRadius: 5
    },
    detailContainer: {
      width: '70%',
      paddingVertical: 14,
      paddingHorizontal: 10,
      justifyContent: 'space-between'
    },
    titleDesc: {
      gap: 4
    },
    author: {
      color: theme.colors.secondaryText
    }
  });
