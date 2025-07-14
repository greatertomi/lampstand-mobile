import { useNavigation } from '@react-navigation/native';
import * as Localization from 'expo-localization';
import { useFormik } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

import { apiService, endpoints, parseHttpError } from '../../api';
import { DropdownPicker, TextField } from '../../components';
import { useNotificationState, useToastState } from '../../store';
import { Theme, useTheme } from '../../styles';
import { Goal } from '../../types';
import { createDefaultFormValues, dailyReminder, logger } from '../../utils';
import { readingGoalSchema } from '../Auth/formValidationSchema';

import { SettingContainer } from './SettingContainer';

export const EditReadingGoal = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const { addNotification } = useNotificationState();
  const { setToastMessage } = useToastState();
  const navigation = useNavigation();

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
    goalInSeconds: readingGoal?.goalInSeconds || 0,
    reminderTime: String(readingGoal?.reminderTime || 0),
    timezone: Localization.getCalendars()[0].timeZone || 'UTC'
  });

  const formik = useFormik<Goal>({
    initialValues: defaultValues,
    enableReinitialize: true,
    validationSchema: readingGoalSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        await handleEditGoal(values);
        navigation.goBack();
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

  const displayMinutes = formik.values.goalInSeconds ? Math.floor(formik.values.goalInSeconds / 60) : 0;

  return (
    <SettingContainer title="Edit Reading Goal" useButton buttonTitle="Save" onPress={formik.handleSubmit}>
      <View style={styles.container}>
        <TextField
          label="Edit Goal"
          placeholder="Input your preferred time"
          value={displayMinutes === 0 ? '' : String(displayMinutes)}
          onChangeText={(text) => {
            const minutes = text === '' ? 0 : Number(text);
            formik.setFieldValue('goalInSeconds', minutes * 60);
          }}
          onBlur={() => formik.handleBlur('goalInSeconds')}
          error={formik.touched.goalInSeconds && !!formik.errors.goalInSeconds && formik.errors.goalInSeconds}
          actionLabel="(Minutes per day)"
          actionLabelVariant="secondary"
          actionLabelStyle={{ backgroundColor: theme.colors.cardBackground, marginLeft: 0 }}
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
