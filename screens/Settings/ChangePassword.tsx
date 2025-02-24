import { isAxiosError } from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import useSWRMutation from 'swr/mutation';

import { apiService, endpoints } from '../../api';
import { PasswordField } from '../../components';
import { useAuthState } from '../../store';
import { Theme, useTheme } from '../../styles';
import { createDefaultFormValues, logger } from '../../utils';
import { setPasswordSchema } from '../Auth/formValidationSchema';

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

  const { trigger: updatePassword } = useSWRMutation(
    endpoints.updatePassword,
    async (
      url,
      {
        arg
      }: {
        arg: ChangePasswordValues;
      }
    ) => {
      const response = await apiService.put(url, arg);
      return response.data;
    }
  );

  const formik = useFormik<ChangePasswordValues>({
    initialValues: defaultValues,
    validationSchema: setPasswordSchema,
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
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 401) {
          setErrors({ currentPassword: 'Current password is incorrect' });
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
      onPress={() => formik.handleSubmit()}
      buttonStyle={{ marginTop: 150 }}
    >
      <View style={styles.fieldsContainer}>
        <PasswordField
          label="Current Password"
          placeholder="**************"
          value={formik.values.currentPassword}
          onChangeText={formik.handleChange('currentPassword')}
          onBlur={formik.handleBlur('currentPassword')}
          error={formik.touched.currentPassword && formik.errors.currentPassword}
          // error={formik.touched.currentPassword && !!formik.errors.password && formik.errors.currentPassword}
        />
        <PasswordField
          label="New Password"
          required
          placeholder="**************"
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          error={formik.touched.password && formik.errors.password}
        />
        <PasswordField
          label="Confirm new password"
          required
          placeholder="**************"
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
