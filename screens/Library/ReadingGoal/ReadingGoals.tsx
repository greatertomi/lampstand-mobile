import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BodyTextSmall, HeadingSmall, PrimaryButton, ProgressSemiCircle } from '../../../components';
import { Theme, useTheme, utilities } from '../../../styles';
import { DailyReadingGoal } from './DailyReadingGoal';
import { BooksRead } from './BooksRead';
import { dummyBooksRead, dummyStreakDays } from '../../../utils';
import { Summary } from './Summary';
import { StreakDays } from './StreakDays';
import { TimerDescription } from './TimerDescription';

export const ReadingGoals = () => {
  const [start, setStart] = useState(false);
  const isGoalTime = true;
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const completedDays = dummyStreakDays.filter((day) => day.completed);

  return (
    <View>
      <View style={[utilities.align_self_center, utilities.align_items_center]}>
        {!isGoalTime && (
          <>
            <HeadingSmall bold>Reading Goals</HeadingSmall>
            <BodyTextSmall style={styles.description}>Incorporate reading into your daily routine.</BodyTextSmall>
          </>
        )}
      </View>
      <View style={styles.todayReadingContainer}>
        <View style={utilities.gap_2}>
          {isGoalTime && (
            <HeadingSmall bold style={utilities.align_self_center}>
              Today&apos;s Goal
            </HeadingSmall>
          )}
          <ProgressSemiCircle progress={10}>
            <TimerDescription goalTime={45} />
          </ProgressSemiCircle>
          <PrimaryButton title="Set Reading Goal" description="The New Girl" onPress={() => setStart(!start)} />
          <View style={styles.streak}>
            {dummyStreakDays.map((streak, index) => (
              <StreakDays key={index} day={streak.day} completed={streak.completed} />
            ))}
          </View>
          {completedDays.length > 1 && (
            <BodyTextSmall style={styles.record}>Your record is {completedDays.length} days</BodyTextSmall>
          )}
        </View>
      </View>
      <DailyReadingGoal show={start} onClose={() => setStart(!start)} />
      <Summary />
      <BooksRead heading="Books Read THis Week" books={dummyBooksRead} />
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
    description: {
      color: theme.colors.secondaryText
    },
    streak: {
      flexDirection: 'row',
      gap: 2
    },
    record: {
      alignSelf: 'center',
      color: theme.colors.secondaryText,
      fontWeight: '500'
    }
  });
