import { useFormik } from 'formik';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { BodyText, OTPInputGroup, PrimaryButton } from '../../components';
import { useTheme } from '../../styles';

import { AuthContainer } from './AuthContainer';
import { otpSchema } from './formValidationSchema';
import { ScreenDescription } from './ScreenDescription';

const maskPhoneNumber = (phoneNumber: string) => {
  const lastThreeDigits = phoneNumber.slice(-3);
  const maskedPart = phoneNumber.slice(0, -3).replaceAll(/./g, '*');
  return maskedPart + lastThreeDigits;
};

export const SMSVerification = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const phone = '07030600314';

  const formik = useFormik({
    initialValues: { otp: Array.from({ length: 4 }, () => '') },
    validationSchema: otpSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
    }
  });

  return (
    <AuthContainer title="We just sent you an SMS">
      <ScreenDescription>Enter the security code we sent to</ScreenDescription>
      <BodyText style={utils.mt_n1}>{maskPhoneNumber(phone)}</BodyText>
      <OTPInputGroup
        value={formik.values.otp}
        onChange={(otp) => formik.setFieldValue('otp', otp)}
        onSubmit={formik.handleSubmit}
      />
      <BodyText variant="error" style={[utils.align_self_center, utils.mt_n2]}>
        {formik.touched.otp && !!formik.errors.otp && (formik.errors.otp as string)}
      </BodyText>
      <View style={styles.button}>
        <PrimaryButton title="Verify" onPress={() => formik.handleSubmit} loading={formik.isSubmitting} />
      </View>
      <View style={[utils.align_items_center, utils.mt_2]}>
        <ScreenDescription link="Resend">Didn&apos;t receive a code?</ScreenDescription>
      </View>
    </AuthContainer>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 24
  }
});
