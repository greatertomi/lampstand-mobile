import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BodyTextSmall, HeadingSmall } from '../../components';
import { Theme, useTheme, utilities } from '../../styles';

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
