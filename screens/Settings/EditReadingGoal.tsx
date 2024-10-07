import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import useSWR, { mutate } from 'swr';
import { useFormik } from 'formik';
import useSWRMutation from 'swr/mutation';
import { SettingContainer } from './SettingContainer';
import { readingGoalSchema } from '../Auth/formValidationSchema';
import { createDefaultFormValues, dailyReminder, dummyDailyReadingGoals, logger } from '../../utils';
import { Theme, useTheme } from '../../styles';
import { Alert, DropdownPicker } from '../../components';
import { Goal } from '../ReadingGoal/types';
import { apiService, endpoints, parseHttpError } from '../../api';

export const EditReadingGoal = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const [alertMessage, setAlertMessage] = useState<string | null>('');

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
        // Todo: Send a global toast notification from here.
      } catch (error) {
        setAlertMessage(parseHttpError(error).message);
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
      {!!alertMessage && <Alert variant="error" onDismiss={() => setAlertMessage(null)} message={alertMessage} />}
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
