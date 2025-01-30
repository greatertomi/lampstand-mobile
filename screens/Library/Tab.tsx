import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BodyText, PressableItem } from '../../components';
import { Theme, useTheme } from '../../styles';

type TabProps = {
  titles: string[];
  activeTab: number;
  onPress: (value: number) => void;
};

export const Tab = ({ titles, activeTab, onPress }: TabProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <View style={styles.tabContainer}>
      {titles.map((title, index) => {
        const isActive = index === activeTab;

        return (
          <PressableItem
            key={index}
            style={[styles.tabItem, isActive && styles.activeTab]}
            onPress={() => onPress(index)}
          >
            <BodyText style={[styles.tabTitle, isActive && styles.activeTitle]}>{title}</BodyText>
          </PressableItem>
        );
      })}
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      top: 12,
      width: '100%',
      zIndex: 100
    },
    tabItem: {
      flex: 1,
      borderBottomWidth: 4,
      borderBottomColor: theme.colors.border
    },
    tabTitle: {
      paddingVertical: 16,
      paddingHorizontal: 8,
      textAlign: 'center'
    },
    activeTab: {
      borderBottomColor: theme.colors.primary
    },
    activeTitle: {
      color: theme.colors.primary
    }
  });
