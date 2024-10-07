import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import {
  BodyText,
  BodyTextLarge,
  BodyTextSmall,
  HeadingSmall,
  PrimaryButton,
  ProgressSemiCircle
} from '../../components';
import { Theme, useTheme } from '../../styles';
import { DailyReadingGoalModal } from './DailyReadingGoalModal';
import { BooksRead } from './BooksRead';
import { dummyBooksRead, dummyStreakDays } from '../../utils';
import { Summary } from './Summary';
import { TimerDescription } from './TimerDescription';
import { useAuthState } from '../../store';
import { isCurrentReadingBook } from './constant';
import { apiService, endpoints } from '../../api';
import { Goal } from './types';
import { NotLoggedIn } from '../NotLoggedIn';
import { StreakDays } from './Streaks/StreakDays';

const DEFAULT_GOAL = 0;
const SUMMARY = false;

export const ReadingGoals = () => {
  const [isSettingGoal, setIsSettingGoal] = useState(false);
  const { isAuthenticated } = useAuthState();
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);
  const completedDays = dummyStreakDays.filter((day) => day.completed);
  const readBooks = dummyBooksRead.filter((book) => book.progress === 100);

  const { data: readingGoal } = useSWR<Goal>(endpoints.getReadingGoal, async (url: string) => {
    const res = await apiService.get(url);
    return res.data.data;
  });

  const { trigger: handleSetGoal } = useSWRMutation(
    endpoints.createReadingGoal,
    async (url, { arg }: { arg: Goal }) => {
      const response = await apiService.post(url, arg);
      await mutate(endpoints.getReadingGoal);
      return response.data;
    }
  );

  if (!isAuthenticated) return <NotLoggedIn />;

  return (
    <View style={utils.mt_5}>
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
      <View style={styles.todayReadingContainer}>
        <View style={utils.gap_2}>
          <ProgressSemiCircle progress={0}>
            <TimerDescription goalInMinutes={readingGoal?.goalInMinutes ?? DEFAULT_GOAL} />
          </ProgressSemiCircle>
          <PrimaryButton
            title={readingGoal ? 'Start Reading' : 'Set Reading Goal'}
            description={isCurrentReadingBook ? 'The New Girl' : ''}
            onPress={() => (readingGoal ? null : setIsSettingGoal(true))}
          />
          <View style={styles.streak}>
            {dummyStreakDays.length > 1 &&
              dummyStreakDays.map((streak, index) => (
                <StreakDays key={index} day={streak.day} completed={streak.completed} />
              ))}
          </View>
          {completedDays.length > 1 && (
            <BodyTextSmall variant="secondary" style={styles.record}>
              Your record is {completedDays.length} days
            </BodyTextSmall>
          )}
        </View>
      </View>
      <DailyReadingGoalModal
        show={isSettingGoal}
        onClose={() => setIsSettingGoal(!isSettingGoal)}
        goalInMinutes={readingGoal?.goalInMinutes}
        reminderTime={readingGoal?.reminderTime}
        handleSetGoal={handleSetGoal}
      />
      {SUMMARY && <Summary />}
      {readBooks.length > 0 && <BooksRead heading="Books Read This Week" books={readBooks} />}
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    todayReadingContainer: {
      height: 297,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 10,
      paddingVertical: 16,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 24
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
