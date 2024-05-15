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

  return (
    <View style={styles.tabContainer}>
      {titles.map((title, index) => (
        <Pressable
          key={index}
          style={({ pressed }) => [styles.tabItem, pressed && { opacity: 0.5 }]}
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
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      top: 12,
      width: '100%',
      zIndex: 100
    },
    tabItem: {
      flex: 1
    },
    tabTitle: {
      borderBottomWidth: 4,
      paddingVertical: 16,
      paddingHorizontal: 8,
      textAlign: 'center',
      borderBottomColor: theme.colors.cardBorderColor
    },
    activeTab: {
      borderBottomColor: theme.colors.primary
    }
  });
