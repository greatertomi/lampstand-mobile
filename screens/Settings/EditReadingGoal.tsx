import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SettingContainer } from './SettingContainer';
import { dailyReminder, dummyDailyReadingGoals } from '../../utils';
import { Theme, useTheme } from '../../styles';
import { DropdownPicker } from '../../components';

export const EditReadingGoal = () => {
  const { theme } = useTheme();
  const [goal, setGoal] = useState<string>('');
  const [reminderTIme, setReminderTime] = useState<string>('');
  const styles = createStyleSheet(theme);

  return (
    <SettingContainer title="Edit Reading Goal" useButton buttonTitle="Save">
      <View style={styles.container}>
        <DropdownPicker
          label="Edit Goal"
          value={goal}
          data={dummyDailyReadingGoals}
          onChange={(item) => setGoal(item.value)}
        />
        <DropdownPicker
          label="Edit Reminder"
          data={dailyReminder}
          value={reminderTIme}
          onChange={(item) => setReminderTime(item.value)}
        />
      </View>
    </SettingContainer>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingVertical: 32,
      gap: 16,
      backgroundColor: theme.colors.background,
      borderRadius: 10
    }
  });
