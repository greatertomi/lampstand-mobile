import { useFormik } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

import { apiService, endpoints, parseHttpError } from '../../api';
import { DropdownPicker } from '../../components';
import { useNotificationState, useToastState } from '../../store';
import { Theme, useTheme } from '../../styles';
import { createDefaultFormValues, dailyReminder, dummyDailyReadingGoals, logger } from '../../utils';
import { readingGoalSchema } from '../Auth/formValidationSchema';
import { Goal } from '../ReadingGoal/types';

import { SettingContainer } from './SettingContainer';

export const EditReadingGoal = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const { addNotification } = useNotificationState();
  const { setToastMessage } = useToastState();

  const { data: readingGoal } = useSWR<Goal>(endpoints.getReadingGoal, async (url: string) => {
    const res = await apiService.get(url);
    return res.data.data;
  });

  const { trigger: handleEditGoal } = useSWRMutation(
    endpoints.createReadingGoal,
    async (url, { arg }: { arg: Goal }) => {
      const response = await apiService.post(url, arg);
      await mutate(endpoints.getReadingGoal);
      return response.data;
    }
  );

  const defaultValues = createDefaultFormValues<Goal>({
    goalInMinutes: readingGoal?.goalInMinutes || 0,
    reminderTime: String(readingGoal?.reminderTime || 0)
  });

  const formik = useFormik<Goal>({
    initialValues: defaultValues,
    enableReinitialize: true,
    validationSchema: readingGoalSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        await handleEditGoal(values);
        setToastMessage('Goal edited successfully!');
      } catch (error) {
        addNotification({
          id: Date.now().toString(),
          message: parseHttpError(error).message,
          type: 'error'
        });
        logger.error(error);
      }
    }
  });

  return (
    <SettingContainer title="Edit Reading Goal" useButton buttonTitle="Save" onPress={formik.handleSubmit}>
      <View style={styles.container}>
        <DropdownPicker
          label="Edit Goal"
          value={String(formik.values.goalInMinutes)}
          data={dummyDailyReadingGoals}
          onChange={(item) => formik.setFieldValue('goalInMinutes', item.value)}
          onBlur={() => formik.handleBlur('goalInMinutes')}
          error={formik.touched.goalInMinutes && !!formik.errors.goalInMinutes && formik.errors.goalInMinutes}
        />
        <DropdownPicker
          label="Edit Reminder"
          data={dailyReminder}
          value={formik.values.reminderTime}
          onChange={(item) => formik.setFieldValue('reminderTime', item.value)}
          onBlur={() => formik.handleBlur('reminderTime')}
          error={formik.touched.reminderTime && !!formik.errors.reminderTime && formik.errors.reminderTime}
        />
      </View>
    </SettingContainer>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingVertical: 28,
      paddingHorizontal: 10,
      gap: 16,
      backgroundColor: theme.colors.cardBackground,
      borderRadius: 10
    }
  });
