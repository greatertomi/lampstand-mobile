import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { BarchartComponent, BodyTextSmall, HeadingSmall, TagText } from '../../../components';
import { Theme, useTheme } from '../../../styles';

type BarChartProps = {
  data: {
    label: string;
    value: number;
  }
}

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

export const Summary = ({ data }: BarChartProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const [activeSection, setActiveSection] = useState(1);
  const styles = createStyleSheet(theme);

  return (
    <View style={[utils.gap_3, utils.my_3]}>
      <HeadingSmall bold>Summary</HeadingSmall>
      <View style={styles.summarySwitcher}>
        {sectionsArray.map((section, index) => (
          <Pressable
            key={index}
            onPress={() => setActiveSection(index)}
            style={({ pressed }) => pressed && { opacity: 0.5 }}
          >
            <BodyTextSmall style={[styles.section, index === activeSection && styles.activeSection]}>
              {section.label}
            </BodyTextSmall>
          </Pressable>
        ))}
      </View>
      <View style={[utils.flex_dir_row, utils.justify_content_between]}>
        <HeadingSmall bold>{sectionsArray[activeSection].name}</HeadingSmall>
        <Pressable style={styles.selectVariation}>
          <TagText>Tuesday</TagText>
          <FontAwesome name="angle-up" size={18} color="black" />
        </Pressable>
      </View>
      <BarchartComponent data={data} />
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
      textAlignVertical: 'center'
    },
    activeSection: {
      backgroundColor: theme.colors.background
    },
    selectVariation: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      borderWidth: 1,
      borderRadius: 50,
      paddingHorizontal: 8,
      paddingVertical: 4
    }
  });
