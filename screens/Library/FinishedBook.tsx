import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';

import { BodyText, BodyTextSmall, HeadingSmall, PressableItem } from '../../components';
import { Theme, useTheme } from '../../styles';

type FinishedBookProps = {
  title: string;
  author: string;
  image: ImageSourcePropType;
  description: string;
};

export const FinishedBook = ({ title, author, image, description }: FinishedBookProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <PressableItem style={styles.container}>
      <Image style={styles.image} source={image} />
      <View style={styles.content}>
        <HeadingSmall bold>{title}</HeadingSmall>
        <BodyText>{author}</BodyText>
        <BodyTextSmall style={styles.description}>{description}</BodyTextSmall>
        <View style={styles.button}>
          <BodyTextSmall style={styles.finished}>Finished</BodyTextSmall>
        </View>
      </View>
    </PressableItem>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: 12,
      alignItems: 'center'
    },
    content: {
      flex: 1,
      justifyContent: 'space-evenly',
      gap: 8
    },
    image: {
      width: 117,
      height: 184,
      resizeMode: 'cover',
      borderRadius: 5
    },
    button: {
      backgroundColor: theme.colors.success,
      width: 70,
      borderRadius: 10,
      paddingVertical: 6,
      paddingHorizontal: 10
    },
    finished: {
      textAlign: 'center',
      color: theme.colors.background
    },
    description: {
      flexWrap: 'wrap'
    }
  });
