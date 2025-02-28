import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import useSWRMutation from 'swr/mutation';

import { apiService, endpoints, parseHttpError } from '../../api';
import { BackButton, PrimaryButton, TextField } from '../../components';
import { ScreenNavigation } from '../../routes';
import { useAuthState, useNotificationState } from '../../store';
import { Theme, useTheme, utilities } from '../../styles';
import { createDefaultFormValues, logger } from '../../utils';

import { AuthContainer } from './AuthContainer';
import { resetPasswordSchema } from './formValidationSchema';
import { ScreenDescription } from './ScreenDescription';

interface ResetPasswordValue {
  email: string;
}

const defaultValues = createDefaultFormValues<ResetPasswordValue>();

export const ResetPassword = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const { setUser } = useAuthState();
  const navigation = useNavigation<ScreenNavigation<'ResetPassword'>>();
  const { addNotification } = useNotificationState();

  const { trigger: resetPassword } = useSWRMutation(
    endpoints.resetPassword,
    async (url, { arg }: { arg: ResetPasswordValue }) => {
      const response = await apiService.post(url, arg);
      return response.data;
    }
  );

  const formik = useFormik<ResetPasswordValue>({
    initialValues: defaultValues,
    validationSchema: resetPasswordSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const response = await resetPassword(values);
        const { data } = response;
        setUser({ ...data, id: data.userId });
        navigation.navigate('OTPVerification');
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
      <BackButton title="Back" />
      <AuthContainer title="Reset Password">
        <ScreenDescription style={utilities.mb_3} variant="tertiary">
          Please enter your email address to request a {'\n'}password reset.
        </ScreenDescription>
        <TextField
          label="Email"
          placeholder="Please enter your email"
          required
          inputMode="email"
          autoCapitalize="none"
          icon={<MaterialCommunityIcons name="email-outline" size={20} color={theme.colors.secondaryText} />}
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          value={formik.values.email}
          error={formik.touched.email && !!formik.errors.email && formik.errors.email}
        />
        <View style={utilities.mt_4}>
          <PrimaryButton
            title="Send"
            onPress={() => formik.handleSubmit()}
            loading={formik.isSubmitting}
            disabled={formik.isSubmitting}
          />
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
    },
  });
