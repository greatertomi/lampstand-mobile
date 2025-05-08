import { useFormik } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { parseHttpError } from '../../api';
import { HeadingMedium, PrimaryButton, DropdownPicker, Dialog } from '../../components';
import { useNotificationState, useToastState } from '../../store';
import { utilities } from '../../styles';
import { Goal } from '../../types';
import { createDefaultFormValues, dailyReminder, dummyDailyReadingGoals, logger } from '../../utils';
import { readingGoalSchema } from '../Auth/formValidationSchema';

type DailyReadingGoalProps = {
  show: boolean;
  onClose: () => void;
  handleSetGoal: (values: Goal) => Promise<void>;
} & Partial<Goal>;

export const DailyReadingGoalModal = ({
  show,
  onClose,
  goalInSeconds,
  reminderTime,
  handleSetGoal
}: DailyReadingGoalProps) => {
  const { addNotification } = useNotificationState();
  const { setToastMessage } = useToastState();

  const defaultValues = createDefaultFormValues<Goal>({
    goalInSeconds: goalInSeconds || 0,
    reminderTime: reminderTime || ''
  });

  const formik = useFormik<Goal>({
    initialValues: defaultValues,
    enableReinitialize: true,
    validationSchema: readingGoalSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        await handleSetGoal(values);
        onClose();
        setToastMessage('Goal set successfully!');
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
    <Dialog onClose={onClose} isOverlay isVisible={show}>
      <View>
        <HeadingMedium bold style={utilities.text_center}>
          Daily Reading Goal
        </HeadingMedium>
        <View style={[utilities.mt_3]}>
          <DropdownPicker
            label="Set your Goal"
            data={dummyDailyReadingGoals}
            value={String((Number(formik.values.goalInSeconds) || 0) / 60)}
            onChange={(item) => formik.setFieldValue('goalInSeconds', item.value)}
            onBlur={() => formik.handleBlur('goalInSeconds')}
            error={formik.touched.goalInSeconds && !!formik.errors.goalInSeconds && formik.errors.goalInSeconds}
          />
          <DropdownPicker
            label="Set Reminder"
            data={dailyReminder}
            value={formik.values.reminderTime}
            onChange={(item) => formik.setFieldValue('reminderTime', item.value)}
            onBlur={() => formik.handleBlur('reminderTime')}
            error={formik.touched.reminderTime && !!formik.errors.reminderTime && formik.errors.reminderTime}
          />
        </View>
        <View style={styles.button}>
          <PrimaryButton
            title="Save Goal"
            onPress={() => formik.handleSubmit()}
            loading={formik.isSubmitting}
            disabled={formik.isSubmitting}
          />
        </View>
      </View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '50%',
    alignSelf: 'center',
    marginTop: 30
  }
});
