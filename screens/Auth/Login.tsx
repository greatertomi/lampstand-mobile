import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import {
  BodyTextSmall,
  CheckBox,
  LinkText,
  PasswordField,
  PrimaryButton,
  SecondaryButton,
  TextField
} from '../../components';
import { Theme, useTheme } from '../../styles';
import { AuthContainer } from './AuthContainer';
import { ScreenDescription } from './ScreenDescription';
import { RootStackParamList } from '../../routes';
import { LoginSchema } from './FormValidationSchema';

type LoginNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const defaultValues = {
  email: '',
  password: ''
};

export const Login = () => {
  const navigation = useNavigation<LoginNavigationProp>();
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const utils = theme.utilities;
  const [isChecked, setIsChecked] = useState(false);

  return (
    <AuthContainer title="Log In">
      <ScreenDescription onPress={() => navigation.navigate('SignUp')} link="Register">
        Dont have an account?
      </ScreenDescription>
      <Formik
        initialValues={defaultValues}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <>
            <View style={utils.gap_2}>
              <View>
                <TextField
                  label="Email"
                  placeholder="Please enter your email"
                  required
                  inputMode="email"
                  autoCapitalize="none"
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
                  placeholder="Please enter your password"
                  required
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  hasError={touched.password && !!errors.password}
                />
                {touched.email && errors.email && (
                  <BodyTextSmall style={styles.errorText}>{errors.password}</BodyTextSmall>
                )}
              </View>
            </View>
            <View style={styles.rememberPassword}>
              <CheckBox
                variant="text"
                label="Remember me"
                isChecked={isChecked}
                onValueChange={() => setIsChecked(!isChecked)}
              />
              <Pressable style={({ pressed }) => [pressed && { opacity: 0.5 }]}>
                <LinkText variant="primary">Forget password?</LinkText>
              </Pressable>
            </View>
            <View style={[utils.my_3, utils.gap_2]}>
              <PrimaryButton title="Continue" onPress={() => handleSubmit()} loading={isSubmitting} />
              <View style={utils.gap_2}>
                <SecondaryButton
                  title="Continue with Google"
                  icon={<Image source={require('../../assets/images/google.png')} style={styles.icon} />}
                />
              </View>
            </View>
          </>
        )}
      </Formik>
    </AuthContainer>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    icon: {
      resizeMode: 'contain',
      width: 32,
      height: 32
    },
    rememberPassword: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 16
    },
    errorText: {
      color: theme.colors.error
    }
  });
