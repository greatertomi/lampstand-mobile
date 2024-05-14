/* eslint-disable import/no-cycle */
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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

type SignUpNavigationProp = NativeStackNavigationProp<
  RootStackParamList, 'Login'>;

export const SignUp = () => {
  const navigation = useNavigation<SignUpNavigationProp>();
  const { theme } = useTheme();
  const utils = theme.utilities;
  const [isChecked, setIsChecked] = useState(false);

  return (
    <ScrollView>
      <AuthContainer title="Create your account">
        <ScreenDescription onPress={() => navigation.navigate('Login')} link="Login">
          Have an account?
        </ScreenDescription>
        <View style={utils.gap_2}>
          <TextField inputMode="text" label="Full Name" placeholder="Enter your full name" required />
          <TextField
            label="Email Address"
            placeholder="Enter your email"
            inputMode="email"
            autoCapitalize="none"
            required
          />
          <PasswordField label="Password" placeholder="Enter password" required />
          <PasswordField label="Confirm Password" placeholder="Re-enter your password" required />
          <CheckBox
            variant="text"
            isChecked={isChecked}
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
            onValueChange={() => setIsChecked(!isChecked)}
          />
        </View>
        <View style={[utils.my_3, utils.gap_2]}>
          <PrimaryButton title="Continue" />
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
