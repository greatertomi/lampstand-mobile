import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { LibraryHeader } from './LibraryHeader';
import { Tab } from './Tab';
import { CurrentReading } from './CurrentReading';
import { ReadingGoals } from './ReadingGoal';
import { FinishedBooks } from './FinishedBooks';
import { Theme, useTheme, utilities } from '../../styles';

const tabTitles = ['Current Reads', 'Reading Goals', 'Finished Books'];
const Components = [CurrentReading, ReadingGoals, FinishedBooks];

export const Library = () => {
  const [activeTab, setActiveTab] = useState(1);
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  const handleTabPress = (index: number) => {
    setActiveTab(index);
  };

  const renderItem = () => {
    const SelectedTab = Components[activeTab];
    return (
      <View style={[utilities.mt_3]}>
        <SelectedTab />
      </View>
    );
  };

  return (
    <FlatList
      ListHeaderComponent={
        <View style={utilities.gap_1}>
          <LibraryHeader />
          <View>
            <View style={styles.line} />
            <Tab titles={tabTitles} activeTab={activeTab} onPress={handleTabPress} />
          </View>
        </View>
      }
      data={[{ key: 'content' }]}
      renderItem={renderItem}
      keyExtractor={(item) => item.key}
      contentContainerStyle={styles.container}
    />
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      backgroundColor: theme.colors.background,
    },
    line: {
      height: 1,
      top: 10,
      backgroundColor: theme.colors.border,
    },
    heading: {
      fontWeight: '700',
    },
  });
