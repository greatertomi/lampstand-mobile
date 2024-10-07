import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BodyText, BodyTextSmall, HeadingSmall } from '../../../components';
import { Theme, useTheme, utilities } from '../../../styles';
import { BooksRead } from './BooksRead';
import { dummyBooksRead } from '../../../utils';

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

  const readBooks = dummyBooksRead.filter((book) => book.progress === 100);

  return (
    <View style={[utilities.gap_3, utilities.mt_3]}>
      <HeadingSmall bold>Summary</HeadingSmall>
      <View style={styles.summarySwitcher}>
        {sectionsArray.map((section, index) => (
          <Pressable
            key={index}
            onPress={() => setActiveSection(index)}
            style={({ pressed }) => pressed && { opacity: 0.5 }}
          >
            <View style={[styles.section, index === activeSection && styles.activeSection]}>
              <BodyTextSmall>{section.label}</BodyTextSmall>
            </View>
          </Pressable>
        ))}
      </View>
      <HeadingSmall bold>{sectionsArray[activeSection].name}</HeadingSmall>
      <Text>Chart goes here</Text>
      {readBooks.length > 0 ? (
        <BooksRead heading={`Books Read ${sectionsArray[activeSection].name}`} books={readBooks} />
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
      backgroundColor: theme.colors.summarySwitcherBackground,
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
