import { isAxiosError } from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import useSWRMutation from 'swr/mutation';

import { apiService, endpoints, parseHttpError } from '../../api';
import { PasswordField } from '../../components';
import { useAuthState, useNotificationState } from '../../store';
import { Theme, useTheme } from '../../styles';
import { createDefaultFormValues, logger } from '../../utils';
import { changePasswordSchema } from '../Auth/formValidationSchema';

import { SettingContainer } from './SettingContainer';

type ChangePasswordValues = {
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

const defaultValues = createDefaultFormValues<ChangePasswordValues>();

export const ChangePassword = () => {
  const { user } = useAuthState();
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const { addNotification } = useNotificationState();

  const { trigger: updatePassword } = useSWRMutation(
    endpoints.updatePassword,
    async (url, { arg }: { arg: ChangePasswordValues }) => {
      const response = await apiService.put(url, arg);
      return response.data;
    }
  );

  const formik = useFormik<ChangePasswordValues>({
    initialValues: defaultValues,
    validationSchema: changePasswordSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setSubmitting(true);
      try {
        const payload = {
          userId: user?.id,
          currentPassword: values.currentPassword,
          password: values.password,
          confirmPassword: values.confirmPassword
        };
        await updatePassword(payload);
        addNotification({
          id: Date.now().toString(),
          message: 'Password has been reset successfully!',
          type: 'success'
        });
        formik.resetForm();
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 401) {
          setErrors({ currentPassword: 'Current password is incorrect' });
        } else if (isAxiosError(error) && error.response?.status === 422) {
          setErrors({ password: 'New password must be different' });
        } else {
          addNotification({
            id: Date.now().toString(),
            message: parseHttpError(error).message,
            type: 'error'
          });
        }
        logger.error(error);
      }
    }
  });

  return (
    <SettingContainer
      title="Change Password"
      useButton
      buttonTitle="Save changes"
      loading={formik.isSubmitting}
      onPress={() => formik.handleSubmit()}
      buttonStyle={{ marginTop: 150 }}
    >
      <View style={styles.fieldsContainer}>
        <PasswordField
          label="Current Password"
          value={formik.values.currentPassword}
          onChangeText={formik.handleChange('currentPassword')}
          onBlur={formik.handleBlur('currentPassword')}
          error={formik.touched.currentPassword && formik.errors.currentPassword}
        />
        <PasswordField
          label="New Password"
          required
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          error={formik.touched.password && formik.errors.password}
        />
        <PasswordField
          label="Confirm new password"
          required
          value={formik.values.confirmPassword}
          onChangeText={formik.handleChange('confirmPassword')}
          onBlur={formik.handleBlur('confirmPassword')}
          error={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />
      </View>
    </SettingContainer>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    fieldsContainer: {
      padding: 16,
      borderRadius: 10,
      backgroundColor: theme.colors.cardBackground,
      gap: 15
    }
  });
