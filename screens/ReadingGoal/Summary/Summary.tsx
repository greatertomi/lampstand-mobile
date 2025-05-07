import Feather from '@expo/vector-icons/Feather';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BodyText, BodyTextSmall, HeadingSmall, PressableItem, PrimaryButton } from '../../../components';
import { BarChart } from '../../../components/Charts';
import { dayData, weekData } from '../../../components/Charts/dummyData';
import { Theme, useTheme, utilities } from '../../../styles';
import { ICON_SIZE, todayDate } from '../../../utils';

import { BooksRead } from './BooksRead';

const sectionsArray = [
  { label: 'Daily', name: 'Today', desc: todayDate(Date.now()) },
  { label: 'Weekly', name: 'This Week', desc: 'Weekly reading time' },
  { label: 'Monthly', name: 'This Month' }
];

export const Summary = () => {
  const { theme } = useTheme();
  const utils = utilities;
  const [activeSection, setActiveSection] = useState(1);
  const styles = createStyleSheet(theme);

  const chartType = activeSection === 0 ? 'day' : 'week';
  const chartData = activeSection === 0 ? dayData : weekData;
  const heading = sectionsArray[activeSection]?.name;

  const readBooks = [];

  return (
    <View style={[utils.gap_1, utils.mt_3]}>
      <View style={styles.summarySwitcher}>
        {sectionsArray.map((section, index) => (
          <PressableItem key={index} onPress={() => setActiveSection(index)} style={styles.sectionWrapper}>
            <View style={[styles.section, index === activeSection && styles.activeSection]}>
              <BodyTextSmall variant={index === activeSection ? 'primary' : undefined}>{section.label}</BodyTextSmall>
            </View>
          </PressableItem>
        ))}
      </View>
      {activeSection === 2 ? (
        <View style={styles.monthlyReport}>
          <HeadingSmall bold>{heading}</HeadingSmall>
          <PrimaryButton
            title="Download monthly report"
            style={[utils.width_75, utils.align_self_start]}
            icon={<Feather name="download" size={ICON_SIZE} color={theme.colors.white} />}
          />
        </View>
      ) : (
        <BarChart
          title={sectionsArray[activeSection]?.desc}
          type={chartType}
          isAnimated
          maxValue={70}
          barData={chartData}
        />
      )}
      {readBooks.length > 0 ? (
        <BooksRead heading={`Books Read ${heading}`} books={[]} />
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
      backgroundColor: theme.colors.cardBackground,
      borderRadius: 50,
      height: 38,
      paddingHorizontal: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    sectionWrapper: {
      flex: 1
    },
    section: {
      borderRadius: 50,
      paddingHorizontal: 24,
      height: 28,
      justifyContent: 'center',
      alignItems: 'center'
    },
    activeSection: {
      backgroundColor: theme.colors.border,
      borderRadius: 20
    },
    monthlyReport: {
      padding: 16,
      gap: 8,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.cardBackground
    }
  });
