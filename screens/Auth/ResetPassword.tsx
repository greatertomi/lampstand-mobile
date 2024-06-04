import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFormik } from 'formik';
import { AuthContainer } from './AuthContainer';
import { ScreenDescription } from './ScreenDescription';
import { PrimaryButton, TextField } from '../../components';
import { resetPasswordSchema } from './formValidationSchema';
import { useTheme, utilities } from '../../styles';
import { createDefaultFormValues } from '../../utils';

interface ResetPasswordValue {
  email: string;
}

const defaultValues = createDefaultFormValues<ResetPasswordValue>();

export const ResetPassword = () => {
  const { theme } = useTheme();

  const formik = useFormik<ResetPasswordValue>({
    initialValues: defaultValues,
    validationSchema: resetPasswordSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
    }
  });

  return (
    <AuthContainer title="Reset Password">
      <ScreenDescription style={utilities.mb_3}>
        Please enter your email address to request a password reset.
      </ScreenDescription>
      <TextField
        label="Email"
        placeholder="Please enter your email"
        required
        inputMode="email"
        autoCapitalize="none"
        icon={
          <MaterialCommunityIcons
            name="email-outline"
            size={20}
            color={theme.colors.slateGray}
          />
        }
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
  );
};
