import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import { Theme, useTheme } from '../../styles';
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
import { SignUpSchema } from './FormValidationSchema';

type SignUpNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const defaultValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreedToTerms: false
};

export const SignUp = () => {
  const navigation = useNavigation<SignUpNavigationProp>();
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const utils = theme.utilities;

  return (
    <ScrollView>
      <AuthContainer title="Create your account">
        <ScreenDescription onPress={() => navigation.navigate('Login')} link="Login">
          Have an account?
        </ScreenDescription>
        <Formik
          initialValues={defaultValues}
          validationSchema={SignUpSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors, touched, isSubmitting }) => (
            <>
              <View style={utils.gap_2}>
                <View>
                  <TextField
                    inputMode="text"
                    label="Full Name"
                    placeholder="Enter your full name"
                    required
                    onChangeText={handleChange('fullName')}
                    onBlur={handleBlur('fullName')}
                    value={values.fullName}
                    hasError={touched.fullName && !!errors.fullName}
                  />
                  {touched.fullName && errors.fullName && (
                    <BodyTextSmall style={styles.errorText}>{errors.fullName}</BodyTextSmall>
                  )}
                </View>
                <View>
                  <TextField
                    label="Email Address"
                    placeholder="Enter your email"
                    inputMode="email"
                    autoCapitalize="none"
                    required
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    hasError={touched.email && !!errors.email}
                  />
                  {touched.email && errors.email && (
                    <BodyTextSmall style={styles.errorText}>{errors.email}</BodyTextSmall>
                  )}
                </View>
                <View>
                  <PasswordField
                    label="Password"
                    placeholder="Enter password"
                    required
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    hasError={touched.password && !!errors.password}
                  />
                  {touched.password && errors.password && (
                    <BodyTextSmall style={styles.errorText}>{errors.password}</BodyTextSmall>
                  )}
                </View>
                <View>
                  <PasswordField
                    label="Confirm Password"
                    placeholder="Re-enter your password"
                    required
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    hasError={touched.confirmPassword && !!errors.confirmPassword}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <BodyTextSmall style={styles.errorText}>{errors.confirmPassword}</BodyTextSmall>
                  )}
                </View>
                <CheckBox
                  variant="text"
                  isChecked={values.agreedToTerms}
                  label={
                    <View style={[utils.flex_dir_row, utils.align_items_center, utils.wrap]}>
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
                    setFieldValue('agreedToTerms', value);
                  }}
                  error={touched.agreedToTerms && errors.agreedToTerms}
                />
              </View>
              <View style={[utils.my_3, utils.gap_2]}>
                <PrimaryButton title="Continue" onPress={() => handleSubmit()} loading={isSubmitting} />
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
            </>
          )}
        </Formik>
      </AuthContainer>
    </ScrollView>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    icon: {
      resizeMode: 'contain',
      width: 32,
      height: 32
    },
    errorText: {
      color: theme.colors.error
    }
  });
