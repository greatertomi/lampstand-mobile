import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import Zocial from '@expo/vector-icons/Zocial';
import { useTheme } from '../../styles';
import {
  BodyText,
  PrimaryButton,
  SecondaryButton,
  PasswordField,
  TextField,
  LinkText,
  CheckBox, LabelText, BodyTextSmall
} from '../../components';
import { AuthContainer } from './AuthContainer';
import { ScreenDescription } from './ScreenDescription';

export const SignUp = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const [isChecked, setIsChecked] = useState(false);

  return (
    <ScrollView>
      <AuthContainer title="Create your account">
        <ScreenDescription description="Have an account?" link="Login" />
        <View style={utils.gap_2}>
          <View style={styles.inputField}>
            <LabelText required fontWeight>Full Name</LabelText>
            <TextField inputMode="text" label="Enter your full name" />
          </View>
          <View style={styles.inputField}>
            <LabelText required fontWeight>Email Address</LabelText>
            <TextField label="Enter your email" inputMode="email" autoCapitalize="none" />
          </View>
          <View style={styles.inputField}>
            <LabelText required fontWeight>Password</LabelText>
            <PasswordField label="Enter password" />
          </View>
          <View style={styles.inputField}>
            <LabelText required fontWeight>Confirm Password</LabelText>
            <PasswordField label="Re-enter your password" />
          </View>
          <CheckBox
            variant="text"
            isChecked={isChecked}
            label={
              <View style={[utils.flex_dir_row, utils.align_items_center]}>
                <BodyTextSmall>I agree to the </BodyTextSmall>
                <LinkText size="small" variant="primary">Terms of Service </LinkText>
                <BodyTextSmall>and </BodyTextSmall>
                <LinkText size="small" variant="primary">Privacy Policy</LinkText>
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
              variant="primary"
            />
            <LinkText size="regular" style={utils.text_center}>Continue as Guest</LinkText>
          </View>
        </View>
      </AuthContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  divider: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    opacity: 0.5
  },
  icon: {
    resizeMode: 'contain',
    width: 32,
    height: 32
  },
  account: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    gap: 4
  },
  inputField: {
    gap: 4
  }
});
