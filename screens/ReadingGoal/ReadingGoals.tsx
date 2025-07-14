import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

import { apiService, endpoints } from '../../api';
import {
  BodyText,
  BodyTextLarge,
  BodyTextSmall,
  HeadingSmall,
  PrimaryButton,
  ProgressSemiCircle
} from '../../components';
import { ScreenNavigation } from '../../routes';
import { useAuthState } from '../../store';
import { Theme, useTheme } from '../../styles';
import { Goal, ReadingLog } from '../../types';
import { filterReadingLogsByToday, logger, schedulePushNotification, calculateSecondsBetweenDates } from '../../utils';
import { NotLoggedIn } from '../NotLoggedIn';

import { isCurrentReadingBook } from './constant';
import { DailyReadingGoalModal } from './DailyReadingGoalModal';
import { StreakDays } from './Streaks';
import { Summary } from './Summary';
import { TimerDescription } from './TimerDescription';
import { ActivityStreak, CurrentStreak } from './types';

const DEFAULT_GOAL = 0;

export const ReadingGoals = () => {
  const [isSettingGoal, setIsSettingGoal] = useState(false);
  const navigation = useNavigation<ScreenNavigation<'ReadingGoals'>>();
  const { isAuthenticated } = useAuthState();
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);

  const { data: readingGoal } = useSWR<Goal>(endpoints.getReadingGoal, async (url: string) => {
    const res = await apiService.get(url);
    return res.data.data;
  });

  const { data: readingLogs } = useSWR<ReadingLog[]>(endpoints.fetchReadingLogs, async (url: string) => {
    const res = await apiService.get(url);
    return res.data.data;
  });

  const { data: currentStreaksData } = useSWR<CurrentStreak>(endpoints.currentStreaks, async (url: string) => {
    const res = await apiService.get(url);
    return res.data;
  });

  const { data: activityStreaksData } = useSWR<ActivityStreak[]>(endpoints.activityStreaks, async (url: string) => {
    const res = await apiService.get(url, { params: { currentWeek: true } });
    return res.data;
  });

  const formattedStreaks = useMemo(() => {
    if (!activityStreaksData) return [];

    return activityStreaksData.map((streak) => ({
      date: streak.date,
      day: streak.dayOfWeek.charAt(0),
      completed: streak.completed
    }));
  }, [activityStreaksData]);

  useEffect(() => {
    if (readingGoal?.reminderTime) {
      sendGoalReminder(readingGoal.reminderTime);
    }
  }, [readingGoal]);

  const { trigger: handleSetGoal } = useSWRMutation(
    endpoints.createReadingGoal,
    async (url, { arg }: { arg: Goal }) => {
      const { goalInSeconds } = arg;
      const response = await apiService.post(url, { ...arg, goalInSeconds });
      await mutate(endpoints.getReadingGoal);
      return response.data;
    }
  );

  useEffect(() => {
    (async () => {
      if (!isAuthenticated) return;
      await mutate(endpoints.getReadingGoal);
    })();
  }, [isAuthenticated]);

  const goalInSeconds = readingGoal?.goalInSeconds ?? DEFAULT_GOAL;
  const goalInMinutes = goalInSeconds > 0 ? Math.floor(goalInSeconds / 60) : DEFAULT_GOAL;

  const memoizedValues = useMemo(() => {
    let totalReadSeconds = 0;

    const todayReadLogs = filterReadingLogsByToday(readingLogs);
    for (const log of todayReadLogs) {
      const seconds = calculateSecondsBetweenDates(log.startTime, log.endTime);
      totalReadSeconds += seconds;
    }

    const calculatedProgress = goalInSeconds > 0 ? (totalReadSeconds / goalInSeconds) * 100 : 0;

    return { calculatedProgress, totalReadSeconds };
  }, [goalInSeconds, readingLogs]);

  const { calculatedProgress: progress, totalReadSeconds: totalReadTime } = memoizedValues;

  if (!isAuthenticated) {
    return <NotLoggedIn />;
  }

  return (
    <View>
      <View style={styles.todayReadingContainer}>
        {readingGoal ? (
          <HeadingSmall bold style={utils.align_self_center}>
            Today&apos;s Goal
          </HeadingSmall>
        ) : (
          <View style={[utils.flex, utils.justify_content_center, utils.align_items_center, utils.gap_1]}>
            <BodyTextLarge bold>Reading Goals</BodyTextLarge>
            <BodyText>Incorporate reading into your daily routine.</BodyText>
          </View>
        )}
        <View style={utils.gap_2}>
          <ProgressSemiCircle progress={progress}>
            <TimerDescription goalInMinutes={goalInMinutes ?? DEFAULT_GOAL} calculatedReadTime={totalReadTime} />
          </ProgressSemiCircle>
          <PrimaryButton
            title={readingGoal ? 'Start Reading' : 'Set Reading Goal'}
            description={isCurrentReadingBook ? 'The New Girl' : ''}
            onPress={() => (readingGoal ? navigation.reset({ routes: [{ name: 'MyBooks' }] }) : setIsSettingGoal(true))}
          />
          <View style={styles.streak}>
            {formattedStreaks.map((streak) => (
              <StreakDays key={streak.date.toString()} day={streak.day} completed={streak.completed} />
            ))}
          </View>
          <BodyTextSmall variant="secondary" style={styles.record}>
            Your record is <BodyTextSmall variant="primary">{currentStreaksData?.count ?? 0}</BodyTextSmall>
            {` ${currentStreaksData?.count === 1 ? 'day' : 'days'}`}
          </BodyTextSmall>
        </View>
      </View>
      <DailyReadingGoalModal
        show={isSettingGoal}
        onClose={() => setIsSettingGoal(!isSettingGoal)}
        goalInSeconds={goalInMinutes}
        reminderTime={readingGoal?.reminderTime}
        handleSetGoal={handleSetGoal}
      />
      <Summary />
    </View>
  );
};

const sendGoalReminder = async (reminderTime: string): Promise<void> => {
  try {
    await schedulePushNotification({
      title: 'Reading Reminder 📚',
      body: "Don't forget about your daily goal!!",
      reminderTime
    });
  } catch (error) {
    logger.error('Failed to fetch reminder time:', error);
  }
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    todayReadingContainer: {
      borderWidth: 1,
      backgroundColor: theme.colors.cardBackground,
      borderColor: theme.colors.border,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 26,
      marginTop: 46,
      gap: 16
    },
    streak: {
      flexDirection: 'row',
      gap: 2
    },
    record: {
      alignSelf: 'center',
      fontWeight: '500'
    }
  });
