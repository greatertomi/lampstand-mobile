import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { BodyTextSmall, HeadingSmall, PrimaryButton, ProgressSemiCircle } from '../../components';
import { Theme, useTheme, utilities } from '../../styles';
import { SetReadingGoal } from './SetReadingGoal';
import { BooksRead } from './BooksRead';
import { dummyBooksRead, dummyStreakDays } from '../../utils';
import { Summary } from './Summary';
import { StreakDays } from './StreakDays';
import { TimerDescription } from './TimerDescription';
import { NotLoggedIn } from './NotLoggedIn';
import { useAuthState } from '../../store';
import { isCurrentReadingBook } from './constant';
import { apiService, endpoints } from '../../api';
import { Goal } from './types';

const DEFAULT_GOAL = 0;

export const ReadingGoals = () => {
  const [isSettingGoal, setIsSettingGoal] = useState(false);
  const { isAuthenticated } = useAuthState();
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const completedDays = dummyStreakDays.filter((day) => day.completed);

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
    <>
      <View style={styles.todayReadingContainer}>
        <View style={utilities.gap_2}>
          <HeadingSmall bold style={utilities.align_self_center}>
            Today&apos;s Goal
          </HeadingSmall>
          <ProgressSemiCircle progress={0}>
            <TimerDescription goalInMinutes={readingGoal?.goalInMinutes ?? DEFAULT_GOAL} />
          </ProgressSemiCircle>
          <PrimaryButton
            title="Set Reading Goal"
            description={isCurrentReadingBook ? 'The New Girl' : ''}
            onPress={() => setIsSettingGoal(!isSettingGoal)}
          />
          <View style={styles.streak}>
            {dummyStreakDays.map((streak, index) => (
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
      <SetReadingGoal
        show={isSettingGoal}
        onClose={() => setIsSettingGoal(!isSettingGoal)}
        goalInMinutes={readingGoal?.goalInMinutes}
        reminderTime={readingGoal?.reminderTime}
        handleSetGoal={handleSetGoal}
      />
      <Summary />
      <BooksRead heading="Books Read This Week" books={dummyBooksRead} />
    </>
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
