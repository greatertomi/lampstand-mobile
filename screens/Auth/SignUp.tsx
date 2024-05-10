import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from '../../styles';
import {
  BodyText,
  PrimaryButton,
  SecondaryButton,
  PasswordField,
  TextField,
  LinkText,
  CheckBox,
} from '../../components';
import { AuthContainer } from './AuthContainer';
import { ScreenDescription } from './ScreenDescription';

export const SignUp = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const [isChecked, setIsChecked] = useState(false);

  return (
    <ScrollView>
      <AuthContainer title="Sign Up">
        <ScreenDescription description="Have an account?" link="Login" />
        <View style={utils.gap_2}>
          <View style={styles.inputField}>
            <BodyText required fontWeight>
              Full name
            </BodyText>
            <TextField inputMode="text" label="Enter your full name" />
          </View>
          <View style={styles.inputField}>
            <BodyText required fontWeight>
              Email Address
            </BodyText>
            <TextField label="Enter your email" inputMode="email" autoCapitalize="none" />
          </View>
          <View style={styles.inputField}>
            <BodyText required fontWeight>
              Password
            </BodyText>
            <PasswordField label="Enter password" />
          </View>
          <View style={styles.inputField}>
            <BodyText required fontWeight>
              Confirm password
            </BodyText>
            <PasswordField label="Re-enter your password" />
          </View>
          <CheckBox
            variant="grey"
            isChecked={isChecked}
            label={
              <View style={[utils.flex_dir_row, utils.align_items_center]}>
                <BodyText>I agree to the{' '}</BodyText>
                <LinkText variant="primary">Terms of Service{' '}</LinkText>
                <BodyText>and{' '}</BodyText>
                <LinkText variant="primary">Privacy Policy</LinkText>
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
              variant="grey"
            />
            <SecondaryButton title="Continue as Guest" variant="grey" />
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
