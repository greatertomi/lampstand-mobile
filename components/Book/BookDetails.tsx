import React from 'react';
import { Image, ImageSourcePropType, Pressable, PressableProps, StyleSheet, Text, View } from 'react-native';
import Svg, { ClipPath, G, Path, Rect } from 'react-native-svg';
import { Theme, useTheme } from '../../styles';
import { HeadingSmall, TagText } from '../Typography';
import { ProgressBar } from '../ProgressBar';

export type BookDetailsProps = {
  title: string;
  author: string;
  image: ImageSourcePropType;
  categories: string[];
  progress: number;
} & PressableProps;

export const BookDetails = ({ title, author, image, categories, progress, ...rest }: BookDetailsProps) => {
  const { theme } = useTheme();
  const _s = theme.utilities;
  const styles = createStyleSheet(theme);

  const CategoryTag = (textArray: string[]) =>
    textArray.map((text, index) => (
      <View key={index} style={styles.categoryStyle}>
        <Text style={{ fontSize: 8 }}>{text}</Text>
      </View>
    ));

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={image} />
      <View style={styles.detailContainer}>
        <View style={{ paddingRight: 14, paddingBottom: 32 }}>
          <View style={[_s.flex_dir_column, _s.gap_3, _s.pl_1]}>
            <View>
              <HeadingSmall numberOfLines={1} ellipsizeMode="tail">
                {title}
              </HeadingSmall>
              <TagText numberOfLines={1} ellipsizeMode="tail" style={{ opacity: 0.5 }}>
                by {author}
              </TagText>
            </View>
            <View style={[_s.flex_dir_row, _s.gap_1, _s.wrap]}>{CategoryTag(categories)}</View>
            <View style={[_s.flex_dir_row, _s.gap_1]}>
              <ProgressBar progress={progress} />
            </View>
          </View>
        </View>
        <Pressable {...rest}>
          <Svg width={24} height={24}>
            <ClipPath id="clip0_580_776">
              <Rect width={24} height={24} fill="white" />
            </ClipPath>
            <G clip-path="url(#clip0_580_776)">
              <Path
                d="M6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6
                10ZM18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1
                10 18 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1
                10 12 10Z"
                fill="#323232"
              />
            </G>
          </Svg>
        </Pressable>
      </View>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
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
      width: 101,
      height: 156,
      resizeMode: 'cover',
      borderRadius: 5
    },
    detailContainer: {
      width: 158,
      flexDirection: 'row',
      paddingTop: 14,
      paddingBottom: 15
    },
    categoryStyle: {
      backgroundColor: theme.colors.categoryBackgroundColor,
      paddingVertical: 6,
      paddingHorizontal: 10
    }
  });
