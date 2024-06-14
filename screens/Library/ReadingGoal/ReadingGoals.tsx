import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BodyTextSmall, HeadingSmall, PrimaryButton } from '../../../components';
import { Theme, useTheme, utilities } from '../../../styles';
import { DailyReadingGoal } from './DailyReadingGoal';
import { Timer } from './Timer';
import { BooksRead } from './BooksRead';
import { dummyBooksRead } from '../../../utils';
import { Summary } from './Summary';

export const ReadingGoals = () => {
  const [start, setStart] = useState(false);
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <>
      <View style={[utilities.align_self_center, utilities.align_items_center]}>
        <HeadingSmall bold>Reading Goals</HeadingSmall>
        <BodyTextSmall style={styles.description}>Incorporate reading into your daily routine.</BodyTextSmall>
      </View>
      <View style={styles.todayReadingContainer}>
        <Timer start={start} />
        <View style={[utilities.width_50, utilities.mt_n3]}>
          <PrimaryButton
            title="Set Reading Goal"
            onPress={() => setStart(!start)}
          />
        </View>
      </View>
      <DailyReadingGoal show={start} onClose={() => setStart(!start)} />
      <Summary />
      <BooksRead heading="Books Read THis Week" books={dummyBooksRead} />
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
      marginTop: 24
    },
    description: {
      color: theme.colors.secondaryText
    }
  });
