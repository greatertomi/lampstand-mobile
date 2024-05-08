import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Theme, useTheme } from '../../styles';
import { BodyText } from '../../components';

type TabProps = {
  titles: string[];
  activeTab: number;
  onPress: (value: number) => void;
};

export const Tab = ({ titles, activeTab, onPress }: TabProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const utils = theme.utilities;

  return (
    <View style={[utils.flex_dir_row, utils.justify_content_center, utils.align_items_center]}>
      {titles.map((title, index) => (
        <Pressable
          key={index}
          style={({ pressed }) => [styles.tabContainer, pressed && { opacity: 0.5 }]}
          onPress={() => onPress(index)}
        >
          <BodyText style={[styles.tabTitle, index === activeTab && styles.activeTab]}>{title}</BodyText>
        </Pressable>
      ))}
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    tabContainer: {
      width: 110,
      borderTopWidth: 1,
      borderTopColor: theme.colors.shadowColor
    },
    tabTitle: {
      borderBottomWidth: 3,
      paddingVertical: 16,
      paddingHorizontal: 8,
      textAlign: 'center',
      borderBottomColor: theme.colors.cardBorderColor
    },
    activeTab: {
      borderBottomColor: theme.colors.primary
    }
  });
