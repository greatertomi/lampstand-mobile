import React from 'react';
import { View } from 'react-native';
import { useFormik } from 'formik';
import { AuthContainer } from './AuthContainer';
import { ScreenDescription } from './ScreenDescription';
import { PasswordField, PrimaryButton } from '../../components';
import { PasswordRules } from './PasswordRules';
import { useTheme } from '../../styles';
import { createDefaultFormValues } from '../../utils';
import { setPasswordSchema } from './formValidationSchema';

type SetPasswordValues = {
  password: string;
  confirmPassword: string;
};

const defaultValues = createDefaultFormValues<SetPasswordValues>();

export const SetPassword = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;

  const formik = useFormik<SetPasswordValues>({
    initialValues: defaultValues,
    validationSchema: setPasswordSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
    }
  });

  return (
    <AuthContainer title="Set Password">
      <ScreenDescription>Set your password</ScreenDescription>
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
  );
};
