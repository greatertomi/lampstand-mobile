import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import React, { useRef, useState } from 'react';
import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputKeyPressEventData, View } from 'react-native';
import useSWRMutation from 'swr/mutation';

import { apiService, endpoints, parseHttpError } from '../../api';
import { BodyText, OTPInput, PressableItem, PrimaryButton, HeadingSmall } from '../../components';
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
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const navigation = useNavigation<ScreenNavigation<'OTPVerification'>>();
  const { user } = useAuthState();
  const { addNotification } = useNotificationState();
  const [isOtpResent, setIsOtpResent] = useState(false);

  const { trigger: verifyUserToken } = useSWRMutation(
    endpoints.verifyResetToken,
    async (
      url,
      {
        arg
      }: {
        arg: ResetTokenValue;
      }
    ) => {
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

  const inputs = useRef<Array<TextInput | null>>([]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...formik.values.otp];
    newOtp[index] = value;
    formik.setFieldValue('otp', newOtp);

    if (value) {
      if (index < newOtp.length - 1) {
        inputs.current[index + 1]?.focus();
        setActiveIndex(index + 1);
      } else {
        formik.submitForm();
      }
    }
  };

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

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && !formik.values.otp[index]) {
      inputs.current[index - 1]?.focus();
      setActiveIndex(index - 1);
    }
  };

  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <PressableItem onPress={() => navigation.goBack()} style={styles.backButton}>
          <Entypo name="chevron-left" size={24} color={theme.colors.text} />
          <HeadingSmall>Back</HeadingSmall>
        </PressableItem>
      </View>
      <AuthContainer title="Verification required">
        <View>
          <BodyText style={styles.tokenText}>
            To continue, complete this verification step, we&apos;ve sent a One Time Password (OTP) to the email{' '}
            {user?.email}. Please enter it below
          </BodyText>
        </View>
        <View style={styles.otpContainer}>
          {formik.values.otp.map((digit, index) => (
            <OTPInput
              key={index}
              isActive={activeIndex === index}
              value={digit as string}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              ref={(input) => {
                inputs.current[index] = input;
              }}
              onBlur={() => formik.handleBlur(`otp[${index}]`)}
              autoFocus={index === 0}
              returnKeyType="next"
              onSubmitEditing={() => {
                if (index < formik.values.otp.length - 1) {
                  inputs.current[index + 1]?.focus();
                }
              }}
            />
          ))}
        </View>
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
          <ScreenDescription link={isOtpResent ? 'OTP resent' : 'Resend again'} onPress={handleResentOtp}>
            Didn&apos;t receive a code?
          </ScreenDescription>
        </View>
      </AuthContainer>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    otpContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 30
    },
    button: {
      marginTop: 24
    },
    headerContainer: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
      backgroundColor: theme.colors.background
    },
    Container: {
      flex: 1,
      width: '100%',
      backgroundColor: theme.colors.background
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 60,
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 10,
      width: '100%'
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    tokenText: {
      color: theme.colors.resetPasswordText
    }
  });
