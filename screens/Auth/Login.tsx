import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import {
  BodyText,
  CheckBox,
  LinkText,
  PasswordField,
  PrimaryButton,
  SecondaryButton,
  TextField
} from '../../components';
import { useTheme } from '../../styles';
import { lineStroke } from '../../assets/svg/lineStroke';
import { AuthContainer } from './AuthContainer';

export const Login = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const [isChecked, setIsChecked] = useState(false);

  return (
    <AuthContainer title="Login">
      <View style={utils.gap_2}>
        <TextField label="Email Address" />
        <PasswordField label="Password" />
      </View>
      <View style={styles.rememberPassword}>
        <CheckBox
          label="Remember me"
          variant="grey"
          isChecked={isChecked}
          onValueChange={() => setIsChecked(!isChecked)}
        />
        <Pressable style={({ pressed }) => [pressed && { opacity: 0.5 }]}>
          <LinkText variant="primary">Forget password?</LinkText>
        </Pressable>
      </View>
      <View style={[utils.my_3, utils.gap_2]}>
        <PrimaryButton title="Continue" />
        <View style={styles.divider}>
          <SvgXml xml={lineStroke} />
          <BodyText>or</BodyText>
          <SvgXml xml={lineStroke} />
        </View>
        <View style={utils.gap_2}>
          <SecondaryButton
            title="Continue with Google"
            icon={<Image source={require('../../assets/images/google.png')} style={styles.icon} />}
            variant="grey"
          />
          <View style={styles.account}>
            <BodyText>Don&apos;t have an account? </BodyText>
            <LinkText variant="primary">Sign up</LinkText>
          </View>
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
  }
});
