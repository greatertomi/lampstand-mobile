import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

import { apiService, endpoints, parseHttpError } from '../../api';
import { LinkText, PasswordField, PrimaryButton, TextField } from '../../components';
import { ScreenNavigation } from '../../routes';
import { useAuthState, useBookSyncState, useNotificationState } from '../../store';
import { useTheme } from '../../styles';
import { createDefaultFormValues, logger, setLocalStorageItem } from '../../utils';

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
  const { setToken, setUser, setIsAuthenticated } = useAuthState();
  const { addNotification } = useNotificationState();
  const { setShouldSync } = useBookSyncState();

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
        setIsAuthenticated(true);
        setToken(token);
        setUser(data);
        await setLocalStorageItem('user', data);
        await setLocalStorageItem('token', token);
        setShouldSync(true);
        await mutate(endpoints.getBooks);
        navigation.navigate('MyBooks');
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
      <View style={utils.my_3}>
        <PrimaryButton
          title="Log In"
          onPress={() => formik.handleSubmit()}
          loading={formik.isSubmitting}
          disabled={formik.isSubmitting}
        />
      </View>
    </AuthContainer>
  );
};
