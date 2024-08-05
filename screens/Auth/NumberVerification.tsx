import React from 'react';
import { View } from 'react-native';
import { useFormik } from 'formik';
import { AuthContainer } from './AuthContainer';
import { ScreenDescription } from './ScreenDescription';
import { PrimaryButton, TextField } from '../../components';
import { createDefaultFormValues } from '../../utils';
import { phoneNumberSchema } from './formValidationSchema';
import { useTheme } from '../../styles';

interface PhoneNumberField {
  phoneNumber: string;
}

const defaultValue = createDefaultFormValues<PhoneNumberField>();

export const NumberVerification = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const formik = useFormik<PhoneNumberField>({
    initialValues: defaultValue,
    validationSchema: phoneNumberSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
    }
  });

  return (
    <AuthContainer title="Verify Your Number">
      <ScreenDescription variant="secondary">Enter  your Phone number</ScreenDescription>
      <View style={utils.mt_5}>
        <TextField
          label="Phone Number"
          required
          placeholder="Enter your phone number"
          keyboardType="numeric"
          inputMode="numeric"
          value={formik.values.phoneNumber}
          onChangeText={formik.handleChange('phoneNumber')}
          onBlur={formik.handleBlur('phoneNumber')}
          error={formik.touched.phoneNumber && !!formik.errors.phoneNumber}
        />
        <View style={utils.mt_5}>
          <PrimaryButton
            title="Verify"
            onPress={() => formik.handleSubmit()}
            loading={formik.isSubmitting}
            disabled={!formik.values.phoneNumber || formik.values.phoneNumber.length !== 11}
          />
        </View>
      </View>
    </AuthContainer>
  );
};
