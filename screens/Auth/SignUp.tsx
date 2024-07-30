import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFormik } from 'formik';
import { useTheme } from '../../styles';
import {
  PrimaryButton,
  SecondaryButton,
  PasswordField,
  TextField,
  LinkText,
  CheckBox,
  BodyTextSmall
} from '../../components';
import { AuthContainer } from './AuthContainer';
import { ScreenDescription } from './ScreenDescription';
import { RootStackParamList } from '../../routes';
import { signUpSchema } from './formValidationSchema';
import { createDefaultFormValues } from '../../utils';

type SignUpNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface SignUpFormProps {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

const defaultValues = createDefaultFormValues<SignUpFormProps>();

export const SignUp = () => {
  const navigation = useNavigation<SignUpNavigationProp>();
  const utils = useTheme().theme.utilities;

  const formik = useFormik<SignUpFormProps>({
    initialValues: defaultValues,
    validationSchema: signUpSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
    }
  });

  return (
    <ScrollView>
      <AuthContainer title="Create your account">
        <ScreenDescription onPress={() => navigation.navigate('Login')} link="Login">
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
            isChecked={formik.values.agreeToTerms}
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
              formik.setFieldValue('agreeToTerms', value);
            }}
            error={formik.touched.agreeToTerms && !!formik.errors.agreeToTerms && formik.errors.agreeToTerms}
          />
        </View>
        <View style={[utils.my_3, utils.gap_2]}>
          <PrimaryButton
            title="Continue"
            onPress={() => formik.handleSubmit()}
            loading={formik.isSubmitting}
            disabled={formik.isSubmitting}
          />
          <View style={utils.gap_2}>
            <SecondaryButton
              title="Continue with Google"
              icon={<Image source={require('../../assets/images/google.png')} style={styles.icon} />}
            />
            <LinkText size="regular" style={utils.text_center}>
              Continue as Guest
            </LinkText>
          </View>
        </View>
      </AuthContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
    width: 32,
    height: 32
  }
});
