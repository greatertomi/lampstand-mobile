import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { LibraryHeader } from './LibraryHeader';
import { Tab } from './Tab';
import { CurrentReading } from './CurrentReading';
import { ReadingGoals } from './ReadingGoals';
import { FinishedBooks } from './FinishedBooks';
import { useTheme } from '../../styles';
import { BookDetails, HeadingSmall } from '../../components';

const tabTitles = ['Current Reads', 'Reading Goals', 'Finished Books'];

export const Library = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { theme } = useTheme();
  const utils = theme.utilities;

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
      {activeTab === 0 && (
        <View style={utils.gap_1}>
          <HeadingSmall style={styles.heading}>Current Reading</HeadingSmall>
          <BookDetails
            title="Testing Design"
            author="John Doe"
            image={require('../../assets/bookImages/bookOne.png')}
            categories={['Fiction', 'Science', 'Sport', 'Fiction', 'Science', 'Sport']}
            progress={0.7}
          />
        </View>
      )}
      <ScrollView>{renderSelectedTab()}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 32,
    padding: 12,
    gap: 8
  },
  heading: {
    fontWeight: '700'
  }
});
