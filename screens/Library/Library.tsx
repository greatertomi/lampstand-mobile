import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LibraryHeader } from './LibraryHeader';
import { Tab } from './Tab';
import { CurrentReading } from './CurrentReading';
import { ReadingGoals } from './ReadingGoals';
import { FinishedBooks } from './FinishedBooks';

const tabTitles = ['Current Reads', 'Reading Goals', 'Finished Books'];

export const Library = () => {
  const [activeTab, setActiveTab] = useState(0);

  const renderSelectedTab = () => {
    switch (activeTab) {
      case 0: {
        return <CurrentReading />;
      }
      case 1: {
        return <ReadingGoals />;
      }
      case 2: {
        return <FinishedBooks />;
      }
      default: {
        return null;
      }
    }
  };

  const handleTabPress = (index: number) => {
    setActiveTab(index);
  };

  return (
    <View style={styles.container}>
      <LibraryHeader />
      <Tab titles={tabTitles} activeTab={activeTab} onPress={handleTabPress} />
      {renderSelectedTab()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 32,
    padding: 12,
    gap: 8
  }
});
