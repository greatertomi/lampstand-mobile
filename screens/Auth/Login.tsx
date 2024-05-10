import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import Zocial from '@expo/vector-icons/Zocial';
import {
  CheckBox, LabelText,
  LinkText,
  PasswordField,
  PrimaryButton,
  SecondaryButton,
  TextField
} from '../../components';
import { useTheme } from '../../styles';
import { AuthContainer } from './AuthContainer';
import { ScreenDescription } from './ScreenDescription';

export const Login = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const [isChecked, setIsChecked] = useState(false);

  return (
    <AuthContainer title="Login">
      <ScreenDescription description="Dont have an account?" link="Register" />
      <View style={utils.gap_2}>
        <View style={styles.inputField}>
          <LabelText required fontWeight>Email</LabelText>
          <TextField label="Email" />
        </View>
        <View style={styles.inputField}>
          <LabelText required fontWeight>Password</LabelText>
          <PasswordField label="Password" />
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
        <PrimaryButton title="Continue" />
        <View style={utils.gap_2}>
          <SecondaryButton
            title="Continue with Google"
            icon={<Image source={require('../../assets/images/google.png')} style={styles.icon} />}
            variant="grey"
          />
          <SecondaryButton
            title="Continue as Guest"
            variant="grey"
            icon={<Zocial name="guest" size={18} color={theme.colors.primary} />}
          />
        </View>
      </View>
    </AuthContainer>
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
    marginTop: 8
  },
  rememberPassword: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16
  },
  inputField: {
    gap: 4
  }
});
