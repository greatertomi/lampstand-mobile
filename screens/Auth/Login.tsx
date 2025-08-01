import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import useSWRMutation from 'swr/mutation';

import { apiService, endpoints, parseHttpError } from '../../api';
import { GoogleLogo } from '../../assets';
import { LinkText, OutlinedButton, PasswordField, PrimaryButton, TextField } from '../../components';
import { useGoogleAuth, useCompleteAuthentication } from '../../hooks';
import { ScreenNavigation } from '../../routes';
import { useAuthState, useNotificationState } from '../../store';
import { useTheme } from '../../styles';
import { createDefaultFormValues, logger } from '../../utils';

import { AuthContainer } from './AuthContainer';
import { loginSchema } from './formValidationSchema';
import { ScreenDescription } from './ScreenDescription';

interface LoginFormValues {
  email: string;
  password: string;
}

const defaultValues = createDefaultFormValues<LoginFormValues>();

export const Login = () => {
  const navigation = useNavigation<ScreenNavigation<'Login'>>();
  const utils = useTheme().theme.utilities;
  const { addNotification } = useNotificationState();
  const { isAuthenticated } = useAuthState();
  const { promptAsync, request, googleResponse } = useGoogleAuth();

  const handleLoginSuccess = useCompleteAuthentication(navigation);

  useEffect(() => {
    (async () => {
      if (isAuthenticated) return;
      if (googleResponse?.type === 'success') {
        const idToken = googleResponse.authentication?.idToken;

        if (!idToken) {
          logger.error('Google OAuth success response is missing idToken.');
          addNotification({
            id: 'google-auth-error',
            message: 'Authentication failed. Please try again.',
            type: 'error'
          });
          return;
        }

        try {
          const res = await apiService.post(endpoints.googleOauth, { token: idToken });
          const { data, token } = res.data;
          await handleLoginSuccess(data, token);
        } catch (error) {
          addNotification({
            id: Date.now().toString(),
            message: parseHttpError(error).message,
            type: 'error'
          });
          logger.error('Google OAuth failed:', error);
        }
      }
    })();
  }, [handleLoginSuccess, addNotification, googleResponse, isAuthenticated]);

  const { trigger: loginUser } = useSWRMutation(endpoints.login, async (url, { arg }: { arg: LoginFormValues }) => {
    const response = await apiService.post(url, arg);
    return response.data;
  });

  const formik = useFormik<LoginFormValues>({
    initialValues: defaultValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const response = await loginUser(values);
        const { data, token } = response;
        await handleLoginSuccess(data, token);
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
    <AuthContainer title="Log In">
      <ScreenDescription variant="secondary" onPress={() => navigation.navigate('SignUp')} link="Register">
        Dont have an account?
      </ScreenDescription>
      <View style={utils.gap_2}>
        <TextField
          label="Email"
          placeholder="Enter your email"
          required
          inputMode="email"
          autoCapitalize="none"
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          value={formik.values.email}
          error={formik.touched.email && !!formik.errors.email && formik.errors.email}
        />
        <PasswordField
          label="Password"
          placeholder="Please enter your password"
          required
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          value={formik.values.password}
          error={formik.touched.password && !!formik.errors.password && formik.errors.password}
        />
      </View>
      <View style={[utils.align_self_end, utils.my_1]}>
        <LinkText variant="primary" onPress={() => navigation.navigate('ResetPassword')}>
          Forget password?
        </LinkText>
      </View>
      <View style={[utils.my_3, utils.gap_2]}>
        <PrimaryButton
          title="Log In"
          onPress={() => formik.handleSubmit()}
          loading={formik.isSubmitting}
          disabled={formik.isSubmitting}
        />
        <OutlinedButton
          title="Continue with google"
          icon={<GoogleLogo size={20} />}
          disabled={!request}
          onPress={() => promptAsync()}
        />
      </View>
    </AuthContainer>
  );
};
