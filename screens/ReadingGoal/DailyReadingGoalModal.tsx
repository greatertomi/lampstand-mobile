import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { parseHttpError } from '../../api';
import { HeadingMedium, PrimaryButton, DropdownPicker, Alert } from '../../components';
import { Theme, useTheme, utilities } from '../../styles';
import { createDefaultFormValues, dailyReminder, dummyDailyReadingGoals, logger } from '../../utils';
import { readingGoalSchema } from '../Auth/formValidationSchema';
import { Goal } from './types';

type DailyReadingGoalProps = {
  show: boolean;
  onClose: () => void;
  handleSetGoal: (values: Goal) => Promise<void>;
} & Partial<Goal>;

export const DailyReadingGoalModal = ({
  show,
  onClose,
  goalInMinutes,
  reminderTime,
  handleSetGoal
}: DailyReadingGoalProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
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
    /* TODO: Create Modal components, to better handles expandability and is reusable */
    <Modal animationType="slide" transparent visible={show}>
      <Pressable style={styles.overlay} onPress={onClose} />
      <View style={styles.modalContent}>
        <Pressable onPress={onClose}>
          <View style={styles.line} />
        </Pressable>
        <View>
          <HeadingMedium bold style={utilities.text_center}>
            Daily Reading Goal
          </HeadingMedium>
          <View style={[utilities.mt_3]}>
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
          <View style={styles.button}>
            <PrimaryButton
              title="Save Goal"
              onPress={() => formik.handleSubmit()}
              loading={formik.isSubmitting}
              disabled={formik.isSubmitting}
            />
          </View>
        </View>
      </View>
      {!!alertMessage && <Alert variant="error" onDismiss={() => setAlertMessage(null)} message={alertMessage} />}
    </Modal>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: theme.colors.overlayBackground
    },
    modalContent: {
      height: '52%',
      width: '100%',
      position: 'absolute',
      bottom: 0,
      backgroundColor: theme.colors.background,
      paddingHorizontal: 16,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
      gap: 16
    },
    button: {
      width: '50%',
      alignSelf: 'center',
      marginTop: 30
    },
    line: {
      width: 40,
      height: 5,
      marginTop: 15,
      alignSelf: 'center',
      borderRadius: 10,
      backgroundColor: theme.colors.secondaryText
    }
  });
