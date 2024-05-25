import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFormik } from 'formik';
import {
  CheckBox,
  LinkText,
  PasswordField,
  PrimaryButton,
  SecondaryButton,
  TextField
} from '../../components';
import { useTheme } from '../../styles';
import { AuthContainer } from './AuthContainer';
import { ScreenDescription } from './ScreenDescription';
import { RootStackParamList } from '../../routes';
import { loginSchema } from './formValidationSchema';
import { createDefaultFormValues } from '../../utils';

type LoginNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface LoginFormValues {
  email: string;
  password: string;
}

const defaultValues = createDefaultFormValues<LoginFormValues>();

export const Login = () => {
  const navigation = useNavigation<LoginNavigationProp>();
  const utils = useTheme().theme.utilities;
  const [isChecked, setIsChecked] = useState(false);

  const formik = useFormik<LoginFormValues>({
    initialValues: defaultValues,
    validationSchema: loginSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
    }
  });

  return (
    <AuthContainer title="Log In">
      <ScreenDescription onPress={() => navigation.navigate('SignUp')} link="Register">
        Dont have an account?
      </ScreenDescription>
      <View style={utils.gap_2}>
        <TextField
          label="Email"
          placeholder="Please enter your email"
          required
          inputMode="email"
          autoCapitalize="none"
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          value={formik.values.email}
          error={formik.touched.email && !!formik.errors.email && formik.errors.email}
        />
        <PasswordField
          label="Password"
          placeholder="Please enter your password"
          required
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          value={formik.values.password}
          error={formik.touched.password && !!formik.errors.password && formik.errors.password}
        />
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
        </View>
      </View>
    </AuthContainer>
  );
};

const styles = StyleSheet.create({
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
  }
});
