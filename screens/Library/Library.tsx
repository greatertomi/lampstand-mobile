import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { LibraryHeader } from './LibraryHeader';
import { Tab } from './Tab';
import { CurrentReading } from './CurrentReading';
import { ReadingGoals } from './ReadingGoals';
import { FinishedBooks } from './FinishedBooks';
import { Theme, useTheme, utilities } from '../../styles';

const tabTitles = ['Current Reads', 'Reading Goals', 'Finished Books'];
const Components = [CurrentReading, ReadingGoals, FinishedBooks];

export const Library = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  const SelectedTab = Components[activeTab];

  const handleTabPress = (index: number) => {
    setActiveTab(index);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <LibraryHeader />
        <View style={styles.line} />
        <Tab titles={tabTitles} activeTab={activeTab} onPress={handleTabPress} />
        <View style={[utilities.mt_3]}>
          <SelectedTab />
        </View>
      </View>
    </ScrollView>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      gap: 8,
      backgroundColor: theme.colors.background
    },
    line: {
      height: 1,
      top: 9,
      backgroundColor: theme.colors.border
    },
    heading: {
      fontWeight: '700'
    }
  });
