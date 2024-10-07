import { useFormik } from 'formik';
import React, { useState } from 'react';
import { View } from 'react-native';
import { parseHttpError } from '../../api';
import { HeadingMedium, PrimaryButton, DropdownPicker, Dialog } from '../../components';
import { useTheme, utilities } from '../../styles';
import { createDefaultFormValues, dailyReminder, dummyDailyReadingGoals, logger } from '../../utils';
import { readingGoalSchema } from '../Auth/formValidationSchema';
import { Goal } from './types';

type DailyReadingGoalProps = {
  show: boolean;
  onClose: () => void;
  handleSetGoal: (values: Goal) => Promise<void>;
} & Partial<Goal>;

export const SetReadingGoal = ({
  show,
  onClose,
  goalInMinutes,
  reminderTime,
  handleSetGoal
}: DailyReadingGoalProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const [alertMessage, setAlertMessage] = useState<string | null>('');

  const defaultValues = createDefaultFormValues<Goal>({
    goalInMinutes: goalInMinutes || 0,
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
        // Todo: Send a global toast notification from here.
      } catch (error) {
        setAlertMessage(parseHttpError(error).message);
        logger.error(error);
      }
    }
  });

  return (
    /* TODO: Create Dialog components, to better handles expandability and is reusable */
    <Dialog
      isOpen={show}
      onClose={onClose}
      alertMessage={alertMessage}
      alertVariant="error"
      onAlertDismiss={() => setAlertMessage(null)}
    >
      <View style={[utils.flex, utils.justify_content_center]}>
        <HeadingMedium bold style={utils.text_center}>
          Daily Reading Goal
        </HeadingMedium>
        <View style={[utils.mt_3]}>
          <DropdownPicker
            label="Set your Goal"
            data={dummyDailyReadingGoals}
            value={String(formik.values.goalInMinutes)}
            onChange={(item) => formik.setFieldValue('goalInMinutes', item.value)}
            onBlur={() => formik.handleBlur('goalInMinutes')}
            error={formik.touched.goalInMinutes && !!formik.errors.goalInMinutes && formik.errors.goalInMinutes}
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
        <View style={[utilities.width_50, utilities.mt_5, utilities.align_self_center]}>
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
