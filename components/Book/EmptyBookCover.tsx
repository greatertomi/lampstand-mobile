import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Theme, useTheme } from '../../styles';

export const EmptyBookCover = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return <View style={styles.container} />;
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.nullBookCover,
      width: '100%',
      height: '100%',
      borderRadius: 5,
      resizeMode: 'stretch'
    }
  });
