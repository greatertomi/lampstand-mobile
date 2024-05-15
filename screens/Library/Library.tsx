import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { LibraryHeader } from './LibraryHeader';
import { Tab } from './Tab';
import { CurrentReading } from './CurrentReading';
import { ReadingGoals } from './ReadingGoals';
import { FinishedBooks } from './FinishedBooks';
import { Theme, useTheme } from '../../styles';
import { CurrentBook, HeadingSmall } from '../../components';

const tabTitles = ['Current Reads', 'Reading Goals', 'Finished Books'];

export const Library = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);

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
      <View style={styles.line} />
      <Tab titles={tabTitles} activeTab={activeTab} onPress={handleTabPress} />
      <ScrollView>
        <View>
          {activeTab === 0 && (
            <View style={[utils.mt_4, utils.gap_2]}>
              <HeadingSmall style={styles.heading}>Currently Reading</HeadingSmall>
              <CurrentBook
                title="Testing Design"
                author="John Doe"
                image={require('../../assets/bookImages/bookOne.png')}
                categories={['Fiction', 'Science', 'Sport', 'Fiction', 'Science', 'Sport']}
                progress={0.7}
              />
            </View>
          )}
        </View>
        <View style={styles.renderedTab}>
          {renderSelectedTab()}
        </View>
      </ScrollView>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 14,
      gap: 8
    },
    line: {
      height: 1,
      top: 9,
      backgroundColor: theme.colors.border
    },
    heading: {
      fontWeight: '700'
    },
    renderedTab: {
      marginTop: 30
    }
  });
