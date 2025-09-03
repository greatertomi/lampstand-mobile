import Feather from '@expo/vector-icons/Feather';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { DateData } from 'react-native-calendars';
import useSWR from 'swr';

import { apiService, endpoints } from '../../../api';
import {
  BodyTextLarge,
  BodyTextSmall,
  DateCalendar,
  HeadingSmall,
  PressableItem,
  PrimaryButton
} from '../../../components';
import { BarChart } from '../../../components/Charts';
import { Theme, useTheme, utilities } from '../../../styles';
import { BarChartDataProps, ChartType, TransformedDataProps } from '../../../types';
import { ICON_SIZE, dateFormats, weekRange } from '../../../utils';

const adjustDate = (base: string, offset: number) =>
  new Date(new Date(base).setDate(new Date(base).getDate() + offset)).toISOString().split('T')[0];

const transformBarChatData = (data: BarChartDataProps[]): TransformedDataProps[] =>
  data.map(({ label, secondsRead }) => ({
    label,
    value: Math.floor(secondsRead / 60)
  }));

export const Summary = () => {
  const { theme } = useTheme();
  const utils = utilities;
  const styles = createStyleSheet(theme);

  const [activeSection, setActiveSection] = useState(1);
  const [pickedDate, setPickedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isCalendar, setIsCalendar] = useState(false);

  const chartType = activeSection === 0 ? ChartType.DAY : ChartType.WEEK;
  const step = activeSection === 0 ? 1 : 6;

  useEffect(() => {
    if (activeSection === 0 || activeSection === 1) {
      setPickedDate(new Date().toISOString().split('T')[0]);
    }
  }, [activeSection]);

  const useFetchReadingStats = (date: string | null, type: ChartType) => {
    const endpoint = type === ChartType.DAY ? endpoints.fetchDailyReadingStats : endpoints.fetchWeeklyReadingStats;
    const query = date ? `${endpoint}?date=${date}` : endpoint;

    return useSWR<BarChartDataProps[]>(query, async (url: string) => {
      const res = await apiService.get(url);
      return res.data;
    });
  };

  const chartData = useFetchReadingStats(pickedDate, chartType);

  const sectionsArray = [
    {
      label: 'Daily',
      name: 'Today',
      desc: (
        <PressableItem onPress={() => setIsCalendar(true)}>
          <BodyTextLarge>{dateFormats(pickedDate)}</BodyTextLarge>
        </PressableItem>
      )
    },
    {
      label: 'Weekly',
      name: 'This Week',
      desc: (
        <PressableItem onPress={() => setIsCalendar(true)}>
          <BodyTextLarge>{weekRange(pickedDate)}</BodyTextLarge>
        </PressableItem>
      )
    },
    {
      label: 'Monthly',
      name: 'This Month'
    }
  ];

  return (
    <View style={[utils.gap_1, utils.mt_3, utils.mb_5]}>
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
          <HeadingSmall bold>{sectionsArray[activeSection]?.name}</HeadingSmall>
          <PrimaryButton
            title="Download monthly report"
            style={[utils.width_75, utils.align_self_start]}
            icon={<Feather name="download" size={ICON_SIZE} color={theme.colors.white} />}
            disabled
          />
        </View>
      ) : (
        <BarChart
          title={sectionsArray[activeSection]?.desc}
          type={chartType}
          isAnimated
          maxValue={60}
          barData={transformBarChatData(chartData.data || [])}
          onLeftPress={() => setPickedDate(adjustDate(pickedDate, -step))}
          onRightPress={() => setPickedDate(adjustDate(pickedDate, step))}
        />
      )}

      <DateCalendar
        onDayPress={(day: DateData) => {
          setPickedDate(day?.dateString);
          setIsCalendar(false);
        }}
        visible={isCalendar}
        onClose={() => setIsCalendar(false)}
      />
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
      alignItems: 'center',
      marginBottom: 8
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
