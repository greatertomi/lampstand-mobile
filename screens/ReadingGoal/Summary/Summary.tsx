import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BodyText, BodyTextSmall, HeadingSmall, PressableItem } from '../../../components';
import { Theme, useTheme, utilities } from '../../../styles';

import { BooksRead } from './BooksRead';

const sectionsArray = [
  {
    label: 'Daily',
    name: 'Today'
  },
  {
    label: 'Weekly',
    name: 'This Week'
  },
  {
    label: 'Monthly',
    name: 'This Month'
  }
];

export const Summary = () => {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState(1);
  const styles = createStyleSheet(theme);

  const readBooks = [];

  return (
    <View style={[utilities.gap_3, utilities.mt_3]}>
      <HeadingSmall bold>Summary</HeadingSmall>
      <View style={styles.summarySwitcher}>
        {sectionsArray.map((section, index) => (
          <PressableItem key={index} onPress={() => setActiveSection(index)}>
            <View style={[styles.section, index === activeSection && styles.activeSection]}>
              <BodyTextSmall>{section.label}</BodyTextSmall>
            </View>
          </PressableItem>
        ))}
      </View>
      <HeadingSmall bold>{sectionsArray[activeSection].name}</HeadingSmall>
      <Text>Chart goes here</Text>
      {readBooks.length > 0 ? (
        <BooksRead heading={`Books Read ${sectionsArray[activeSection].name}`} books={[]} />
      ) : (
        <BodyText bold style={utilities.text_center}>
          Books Read {sectionsArray[activeSection].name} will appear here
        </BodyText>
      )}
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    summarySwitcher: {
      backgroundColor: theme.colors.inactiveButtonColor,
      borderRadius: 10,
      height: 32,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    },
    section: {
      borderRadius: 10,
      paddingHorizontal: 24,
      height: 28,
      justifyContent: 'center'
    },
    activeSection: {
      backgroundColor: theme.colors.background
    }
  });
