import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import { Theme, useTheme } from '../../styles';

import { OverviewProps } from './types';

type BookCoverProps = Pick<OverviewProps, 'cover'>;

export const BookCover = ({ cover }: BookCoverProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <View style={styles.imageContainer}>
      {cover ? <Image source={{ uri: cover }} style={styles.image} /> : <View style={styles.placeholder} />}
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    imageContainer: {
      marginRight: 10,
      width: 120,
      aspectRatio: 2 / 3
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: 5
    },
    placeholder: {
      backgroundColor: theme.colors.secondaryText,
      width: '100%',
      height: '100%',
      borderRadius: 5
    }
  });
