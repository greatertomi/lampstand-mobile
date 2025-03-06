import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import useSWRMutation from 'swr/mutation';

import { apiService, endpoints, parseHttpError } from '../../api';
import { BodyText, PrimaryButton, OTPInputGroup, BackButton } from '../../components';
import { ScreenNavigation } from '../../routes';
import { useAuthState, useNotificationState } from '../../store';
import { Theme, useTheme } from '../../styles';
import { logger, setLocalStorageItem } from '../../utils';

import { AuthContainer } from './AuthContainer';
import { otpSchema } from './formValidationSchema';
import { ScreenDescription } from './ScreenDescription';

interface ResetTokenValue {
  token: string;
  userId: string;
}

export const OTPVerification = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);
  const navigation = useNavigation<ScreenNavigation<'OTPVerification'>>();
  const { user } = useAuthState();
  const { addNotification } = useNotificationState();
  const [isOtpResent, setIsOtpResent] = useState(false);

  const { trigger: verifyUserToken } = useSWRMutation(
    endpoints.verifyResetToken,
    async (url, { arg }: { arg: ResetTokenValue }) => {
      const response = await apiService.post(url, arg);
      return response.data;
    }
  );

  const formik = useFormik({
    initialValues: { otp: Array.from({ length: 4 }, () => '') },
    validationSchema: otpSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        if (!user?.id) {
          throw new Error('User ID is missing');
        }

        const payload = {
          token: values.otp.join(''),
          userId: user?.id
        };
        await setLocalStorageItem('passwordToken', payload.token);

        const response = await verifyUserToken(payload);

        if (response.success) {
          navigation.navigate('SetPassword');
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

  const handleResentOtp = async () => {
    try {
      if (!user?.email) {
        throw new Error('User email is missing');
      }

      const response = await apiService.post(endpoints.resetPassword, { email: user.email });

      if (response.data.success) {
        setIsOtpResent(true);

        setTimeout(() => setIsOtpResent(false), 10_000);
      }
    } catch (error) {
      addNotification({
        id: Date.now().toString(),
        message: parseHttpError(error).message,
        type: 'error'
      });
      logger.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <AuthContainer title="Verification required">
        <View>
          <BodyText style={styles.tokenText}>
            To continue, complete this verification step, we&apos;ve sent a One Time Password (OTP) to the email{' '}
            {user?.email}. Please enter it below
          </BodyText>
        </View>
        <OTPInputGroup
          length={4}
          value={formik.values.otp}
          onChange={(otp) => formik.setFieldValue('otp', otp)}
          onSubmit={() => formik.handleSubmit()}
        />
        <BodyText variant="error" style={[utils.align_self_center, utils.mt_n2]}>
          {formik.touched.otp && !!formik.errors.otp && (formik.errors.otp as string)}
        </BodyText>
        <View style={styles.button}>
          <PrimaryButton
            title="Continue"
            onPress={() => {
              formik.handleSubmit();
            }}
            loading={formik.isSubmitting}
          />
        </View>
        <View style={[utils.align_items_center, utils.mt_2]}>
          {isOtpResent ? (
            <BodyText>OTP resent</BodyText>
          ) : (
            <ScreenDescription link="Resend again" onPress={handleResentOtp}>
              Didn&apos;t receive a code?
            </ScreenDescription>
          )}
        </View>
      </AuthContainer>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    button: {
      marginTop: 24
    },
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: theme.colors.background
    },
    tokenText: {
      color: theme.colors.resetPasswordText
    }
  });
