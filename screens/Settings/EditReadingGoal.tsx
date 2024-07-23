import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SettingContainer } from './SettingContainer';
import { DropDownList } from '../../components';
import { dailyReminder, dummyDailyReadingGoals } from '../../utils';
import { Theme, useTheme } from '../../styles';

export const EditReadingGoal = () => {
  const { theme } = useTheme();
  const [goal, setGoal] = useState<string | number>(0);
  const [reminderTIme, setReminderTime] = useState<string | number>('');
  const styles = createStyleSheet(theme);

  return (
    <SettingContainer
      title="Edit Reading Goal"
      useButton
      buttonTitle="Save"
    >
      <View style={styles.container}>
        <DropDownList
          label="Edit Goal"
          value={goal}
          data={dummyDailyReadingGoals}
          handleOnChange={setGoal}
        />
        <DropDownList
          label="Edit Reminder"
          data={dailyReminder}
          value={reminderTIme}
          handleOnChange={setReminderTime}
        />
      </View>
    </SettingContainer>
  );
};

const createStyleSheet = (theme: Theme) => StyleSheet.create({
  container: {
    padding: 32,
    gap: 16,
    backgroundColor: theme.colors.background,
    borderRadius: 10
  }
});
