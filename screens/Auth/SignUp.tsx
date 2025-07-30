import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import useSWRMutation from 'swr/mutation';

import { apiService, endpoints, parseHttpError } from '../../api';
import { GoogleLogo } from '../../assets';
import {
  PrimaryButton,
  PasswordField,
  TextField,
  LinkText,
  CheckBox,
  BodyTextSmall,
  OutlinedButton
} from '../../components';
import { useExpoToken, useGoogleAuth, useCompleteAuthentication } from '../../hooks';
import { ScreenNavigation } from '../../routes';
import { useAuthState, useNotificationState } from '../../store';
import { Theme, useTheme } from '../../styles';
import { createDefaultFormValues, logger } from '../../utils';

import { AuthContainer } from './AuthContainer';
import { signUpSchema } from './formValidationSchema';
import { ScreenDescription } from './ScreenDescription';

interface SignUpFormProps {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreedToTerms: boolean;
  expoPushToken: string;
}

const defaultValues = createDefaultFormValues<SignUpFormProps>();

export const SignUp = () => {
  const navigation = useNavigation<ScreenNavigation<'SignUp' | 'MyBooks'>>();
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);
  const { isAuthenticated } = useAuthState();
  const { addNotification } = useNotificationState();
  const expoPushToken = useExpoToken();
  const { promptAsync, request, googleResponse } = useGoogleAuth();
  const handleRegisterSuccess = useCompleteAuthentication(navigation);

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
          await handleRegisterSuccess(data, token);
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
  }, [addNotification, googleResponse, handleRegisterSuccess, isAuthenticated]);

  const { trigger } = useSWRMutation(endpoints.signup, async (url, { arg }: { arg: SignUpFormProps }) => {
    const response = await apiService.post(url, { ...arg, expoPushToken });
    return response.data;
  });

  const formik = useFormik<SignUpFormProps>({
    initialValues: defaultValues,
    validationSchema: signUpSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const response = await trigger(values);
        const { data, token } = response;
        await handleRegisterSuccess(data, token);
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
    <ScrollView style={styles.scrollView}>
      <AuthContainer title="Create your account">
        <ScreenDescription variant="secondary" onPress={() => navigation.navigate('Login')} link="Login">
          Have an account?
        </ScreenDescription>
        <View style={utils.gap_2}>
          <TextField
            inputMode="text"
            label="Full Name"
            placeholder="Enter your full name"
            required
            onChangeText={formik.handleChange('fullName')}
            onBlur={formik.handleBlur('fullName')}
            value={formik.values.fullName}
            error={formik.touched.fullName && formik.errors.fullName && formik.errors.fullName}
          />
          <TextField
            label="Email Address"
            placeholder="Enter your email"
            inputMode="email"
            autoCapitalize="none"
            required
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            value={formik.values.email}
            error={formik.touched.email && !!formik.errors.email && formik.errors.email}
          />
          <PasswordField
            label="Password"
            placeholder="Enter password"
            required
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            value={formik.values.password}
            error={formik.touched.password && !!formik.errors.password && formik.errors.password}
          />
          <PasswordField
            label="Confirm Password"
            placeholder="Re-enter your password"
            required
            onChangeText={formik.handleChange('confirmPassword')}
            onBlur={formik.handleBlur('confirmPassword')}
            value={formik.values.confirmPassword}
            error={formik.touched.confirmPassword && !!formik.errors.confirmPassword && formik.errors.confirmPassword}
          />
          <CheckBox
            variant="text"
            isChecked={formik.values.agreedToTerms}
            label={
              <View style={[utils.flex_dir_row, utils.align_items_center]}>
                <BodyTextSmall>I agree to the </BodyTextSmall>
                <LinkText size="small" variant="primary">
                  Terms of Service{' '}
                </LinkText>
                <BodyTextSmall>and </BodyTextSmall>
                <LinkText size="small" variant="primary">
                  Privacy Policy
                </LinkText>
              </View>
            }
            onValueChange={(value) => {
              formik.setFieldValue('agreedToTerms', value);
            }}
            error={formik.touched.agreedToTerms && formik.errors.agreedToTerms && formik.errors.agreedToTerms}
          />
        </View>
        <View style={[utils.my_3, utils.gap_2]}>
          <PrimaryButton
            title="Continue"
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
          <LinkText size="regular" style={utils.text_center} onPress={() => navigation.navigate('MyBooks')}>
            Continue as Guest
          </LinkText>
        </View>
      </AuthContainer>
    </ScrollView>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    scrollView: {
      backgroundColor: theme.colors.background
    }
  });
