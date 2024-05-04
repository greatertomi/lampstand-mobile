import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Theme, useTheme } from '../../styles';
import { HeadingSmall, TagText } from '../Typography';
import { ProgressBar } from '../ProgressBar';
import { CategoryTag } from './CategoryTag';
import { IconButton } from '../Button';

export type BookDetailsProps = {
  title: string;
  author: string;
  image: ImageSourcePropType;
  categories: string[];
  progress: number;
};

export const BookDetails = ({ title, author, image, categories, progress }: BookDetailsProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);

  return (
    <View style={styles.shadow}>
      <View style={styles.container}>
        <Image style={styles.image} source={image} />
        <View style={styles.detailContainer}>
          <View style={[utils.flex_dir_row, utils.justify_content_between]}>
            <View style={{ gap: 4 }}>
              <HeadingSmall numberOfLines={1} ellipsizeMode="tail">
                {title}
              </HeadingSmall>
              <TagText numberOfLines={1} ellipsizeMode="tail">
                by {author}
              </TagText>
            </View>
            <View>
              <IconButton>
                <Entypo name="dots-three-horizontal" size={20} color={theme.colors.text} />
              </IconButton>
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
      height: 158,
      borderWidth: 1,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      borderColor: theme.colors.cardBorderColor
    },
    image: {
      width: '30%',
      height: 156,
      resizeMode: 'cover',
      borderRadius: 5
    },
    detailContainer: {
      width: '70%',
      paddingVertical: 14,
      paddingHorizontal: 10,
      justifyContent: 'space-between'
    }
  });
