import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import useSWRMutation from 'swr/mutation';

import { apiService, endpoints, parseHttpError } from '../../api';
import { BackButton, PasswordField, PrimaryButton } from '../../components';
import { ScreenNavigation } from '../../routes';
import { useAuthState, useNotificationState } from '../../store';
import { Theme, useTheme } from '../../styles';
import { createDefaultFormValues, getLocalStorageItem, logger, removeLocalStorageItem } from '../../utils';

import { AuthContainer } from './AuthContainer';
import { setPasswordSchema } from './formValidationSchema';
import { PasswordRules } from './PasswordRules';
import { ScreenDescription } from './ScreenDescription';

type SetPasswordValues = {
  password: string;
  confirmPassword: string;
};

const defaultValues = createDefaultFormValues<SetPasswordValues>();

export const SetPassword = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const utils = theme.utilities;
  const navigation = useNavigation<ScreenNavigation<'SetPassword'>>();
  const { user } = useAuthState();
  const { addNotification } = useNotificationState();

  const { trigger: updatePassword } = useSWRMutation(
    endpoints.updatePassword,
    async (url, { arg }: { arg: SetPasswordValues }) => {
      const response = await apiService.put(url, arg);
      return response.data;
    }
  );

  const formik = useFormik<SetPasswordValues>({
    initialValues: defaultValues,
    validationSchema: setPasswordSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const resetPasswordToken = await getLocalStorageItem('passwordToken');
        const payload = {
          token: resetPasswordToken,
          userId: user?.id,
          password: values.password,
          confirmPassword: values.confirmPassword
        };
        const response = await updatePassword(payload);

        if (response.success) {
          await removeLocalStorageItem('passwordToken');
          navigation.navigate('OTPSuccess');
        }
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
    <View style={styles.container}>
      <BackButton />
      <AuthContainer title="Set Password">
        <ScreenDescription variant="tertiary">Set your password</ScreenDescription>
        <View style={[utils.gap_3, utils.mt_3]}>
          <PasswordField
            label="Password"
            required
            placeholder="Enter your password"
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            error={formik.touched.password && formik.errors.password}
          />
          <PasswordField
            label="Confirm Password"
            required
            placeholder="Confirm password"
            value={formik.values.confirmPassword}
            onChangeText={formik.handleChange('confirmPassword')}
            onBlur={formik.handleBlur('confirmPassword')}
            error={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
          <PasswordRules password={formik.values.password} />
          <View style={utils.mt_1}>
            <PrimaryButton title="Reset Password" loading={formik.isSubmitting} onPress={() => formik.handleSubmit()} />
          </View>
        </View>
      </AuthContainer>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: theme.colors.background
    }
  });
