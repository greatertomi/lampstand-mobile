import * as Localization from 'expo-localization';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { parseHttpError } from '../../api';
import { HeadingMedium, DropdownPicker, TextField, BottomSheet } from '../../components';
import { useNotificationState, useToastState } from '../../store';
import { useTheme, utilities } from '../../styles';
import { Goal } from '../../types';
import { createDefaultFormValues, dailyReminder, logger } from '../../utils';
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
  const { theme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const defaultValues = createDefaultFormValues<Goal>({
    goalInSeconds: goalInSeconds || 0,
    reminderTime: reminderTime || '',
    timezone: Localization.getCalendars()[0].timeZone || 'UTC'
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
      } finally {
        setSubmitting(false);
      }
    }
  });

  const displayMinutes = formik.values.goalInSeconds ? Math.floor(formik.values.goalInSeconds / 60) : 0;

  return (
    <BottomSheet
      onClose={onClose}
      isVisible={show}
      primaryButtonText="Save Goal"
      primaryButtonOnPress={formik.handleSubmit}
      isPrimaryButtonDisabled={formik.isSubmitting}
      isPrimaryButtonLoading={formik.isSubmitting}
      footerStyle={styles.button}
      gestureEnabled={!isDropdownOpen}
      enablePanDownToClose
      persistTaps="always"
      snapPoints={['60%', '80%', '100%']}
    >
      <HeadingMedium bold style={utilities.text_center}>
        Daily Reading Goal
      </HeadingMedium>
      <View style={utilities.mt_3}>
        <TextField
          label="Set your Goal"
          placeholder="Input your preferred time"
          keyboardType="numeric"
          inputMode="numeric"
          value={displayMinutes === 0 ? '' : String(displayMinutes)}
          onChangeText={(item) => {
            const minutes = item === '' ? 0 : Number(item);
            formik.setFieldValue('goalInSeconds', minutes * 60);
          }}
          onBlur={() => formik.handleBlur('goalInSeconds')}
          error={formik.touched.goalInSeconds && !!formik.errors.goalInSeconds && formik.errors.goalInSeconds}
          actionLabel="(Minutes per day)"
          actionLabelStyle={{ backgroundColor: theme.colors.background, marginLeft: 0 }}
          actionLabelVariant="secondary"
        />
        <DropdownPicker
          label="Set Reminder"
          data={dailyReminder}
          value={formik.values.reminderTime}
          onChange={(item) => formik.setFieldValue('reminderTime', item.value)}
          onBlur={() => formik.handleBlur('reminderTime')}
          error={formik.touched.reminderTime && !!formik.errors.reminderTime && formik.errors.reminderTime}
          containerStyles={utilities.mt_2}
          dropdownStyles={{ backgroundColor: theme.colors.background }}
          onOpen={() => setIsDropdownOpen(true)}
          onClose={() => {
            setIsDropdownOpen(false);
          }}
        />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '50%',
    alignSelf: 'center',
    marginTop: 30
  }
});
