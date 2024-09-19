import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import useSWRMutation from 'swr/mutation';
import { HeadingMedium, PrimaryButton, DropdownPicker, Alert } from '../../components';
import { createDefaultFormValues, dailyReminder, dummyDailyReadingGoals, logger } from '../../utils';
import { Theme, useTheme, utilities } from '../../styles';
import { readingGoalSchema } from '../Auth/formValidationSchema';
import { useAuthState } from '../../store';
import { apiService, endpoints, parseHttpError } from '../../api';

type DailyReadingGoalProps = {
  show: boolean;
  onClose: () => void;
};

interface DailyGoalValues {
  goalInMinutes: string;
  reminderTime: string;
}

const defaultValues = createDefaultFormValues<DailyGoalValues>();

export const DailyReadingGoal = ({ show, onClose }: DailyReadingGoalProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const [isVisible, setIsVisible] = useState(show);
  const { user } = useAuthState();
  const [alertMessage, setAlertMessage] = useState<string | null>('');
  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  const { trigger: handleSetGoal } = useSWRMutation(
    endpoints.createReadingGoal,
    async (url, { arg }: { arg: DailyGoalValues }) => {
      const response = await apiService.post(url, arg);
      return response.data;
    }
  );

  const formik = useFormik<DailyGoalValues>({
    initialValues: defaultValues,
    validationSchema: readingGoalSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const newValues = {
        ...values,
        user: user?.id
      };
      setSubmitting(true);
      try {
        const response = await handleSetGoal(newValues);
        if (response) {
          setIsVisible(!show);
        }
      } catch (error) {
        setAlertMessage(parseHttpError(error).message);
        logger.error(error);
      }
    }
  });

  return (
    <Modal animationType="slide" transparent visible={isVisible}>
      <Pressable
        style={styles.overlay}
        onPress={() => {
          setIsVisible(!isVisible);
          onClose();
        }}
      />
      <View style={styles.modalContent}>
        <Pressable
          onPress={() => {
            setIsVisible(!isVisible);
            onClose();
          }}
        >
          <View style={styles.line} />
        </Pressable>
        <View style={styles.content}>
          <HeadingMedium bold style={utilities.text_center}>
            Daily Reading Goal
          </HeadingMedium>
          <View style={[utilities.mt_3]}>
            <DropdownPicker
              label="Set your Goal"
              data={dummyDailyReadingGoals}
              value={formik.values.goalInMinutes}
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
      backgroundColor: theme.colors.modalOverlayBackground,
      opacity: 0.2
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
    content: {
      marginVertical: 30
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
