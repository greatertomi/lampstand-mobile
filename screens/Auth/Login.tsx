import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CheckBox, LinkText, PasswordField, PrimaryButton, SecondaryButton, TextField } from '../../components';
import { useTheme } from '../../styles';
import { AuthContainer } from './AuthContainer';
import { ScreenDescription } from './ScreenDescription';
import { RootStackParamList } from '../../routes';

type LoginNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export const Login = () => {
  const navigation = useNavigation<LoginNavigationProp>();
  const { theme } = useTheme();
  const utils = theme.utilities;
  const [isChecked, setIsChecked] = useState(false);

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
        />
        <PasswordField label="Password" placeholder="Please enter your password" required />
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
