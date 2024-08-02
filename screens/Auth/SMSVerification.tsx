import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, TextInputKeyPressEventData, NativeSyntheticEvent } from 'react-native';
import { useFormik } from 'formik';
import { otpSchema } from './formValidationSchema';
import { AuthContainer } from './AuthContainer';
import { ScreenDescription } from './ScreenDescription';
import { maskPhoneNumber } from '../../utils';
import { BodyText, OTPInput, PrimaryButton } from '../../components';
import { useTheme } from '../../styles';

export const SMSVerification = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const phone = '07030600314';

  const formik = useFormik({
    initialValues: { otp: Array.from({ length: 6 }).fill('') },
    validationSchema: otpSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
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

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && !formik.values.otp[index]) {
      inputs.current[index - 1]?.focus();
      setActiveIndex(index - 1);
    }
  };

  return (
    <AuthContainer title="We just sent you an SMS">
      <ScreenDescription>Enter the security code we sent to</ScreenDescription>
      <BodyText style={utils.mt_n1}>{maskPhoneNumber(phone)}</BodyText>
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
      <View style={[utils.align_items_center, utils.mt_2]}>
        <ScreenDescription link="Resend again">Didn&apos;t receive a code?</ScreenDescription>
      </View>
      <View style={styles.button}>
        <PrimaryButton title="Verify" onPress={() => formik.handleSubmit} loading={formik.isSubmitting} />
      </View>
    </AuthContainer>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 30
  },
  button: {
    marginTop: 120
  }
});
