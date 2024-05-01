import React from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Theme, useTheme } from '../../styles';
import { HeadingSmall, TagText } from '../Typography';
import { ProgressBar } from '../ProgressBar';
import { threeDots } from '../../assets/svg/threeDots';

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

  const CategoryTag = (textArray: string[]) =>
    textArray.map((text, index) => (
      <View key={index} style={styles.categoryStyle}>
        <Text style={{ fontSize: 10 }}>{text}</Text>
      </View>
    ));

  return (
    <View style={styles.shadow}>
      <View style={styles.container}>
        <Image style={styles.image} source={image} />
        <View style={styles.detailContainer}>
          <View style={styles.detailInnerContainer}>
            <View style={styles.titleSection}>
              <View>
                <HeadingSmall numberOfLines={1} ellipsizeMode="tail">
                  {title}
                </HeadingSmall>
                <TagText numberOfLines={1} ellipsizeMode="tail">
                  by {author}
                </TagText>
              </View>
              <View>
                <Pressable style={({ pressed }) => [pressed && { opacity: 0.5 }]}>
                  <SvgXml xml={threeDots} width="24" height="24" />
                </Pressable>
              </View>
            </View>
            <View style={[utils.flex_dir_row, utils.gap_1, utils.wrap]}>{CategoryTag(categories)}</View>
            <View style={[utils.flex_dir_row, utils.gap_1]}>
              <ProgressBar progress={progress} />
            </View>
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
      width: 101,
      height: 156,
      resizeMode: 'cover',
      borderRadius: 5
    },
    detailContainer: {
      width: '100%',
      flexDirection: 'row',
      paddingTop: 14,
      paddingBottom: 15
    },
    detailInnerContainer: {
      paddingLeft: 10,
      gap: 8
    },
    categoryStyle: {
      backgroundColor: theme.colors.categoryBackgroundColor,
      paddingVertical: 6,
      paddingHorizontal: 10
    },
    titleSection: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  });
