import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Theme, useTheme } from '../../styles';

type CategoryTagProps = {
  categories: string[];
};

export const CategoryTag = ({ categories }: CategoryTagProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const categoriesToDisplay = categories.slice(0, 3);
  const leftOverCategories = categories.length - categoriesToDisplay.length;

  return (
    <>
      {categoriesToDisplay?.map((category, index) => (
        <View key={index} style={styles.categoryStyle}>
          <Text style={{ fontSize: 10 }}>{category}</Text>
        </View>
      ))}
      {leftOverCategories > 0 && (
        <View style={styles.categoryStyle}>
          <Text style={{ fontSize: 10 }}>+{leftOverCategories}</Text>
        </View>
      )}
    </>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    categoryStyle: {
      backgroundColor: theme.colors.background,
      borderRadius: 50,
      paddingVertical: 6,
      paddingHorizontal: 10
    }
  });
