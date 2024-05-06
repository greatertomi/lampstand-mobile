import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Checkbox from 'expo-checkbox';
import {
  AuthContainer,
  AuthHeader,
  BodyText,
  PasswordField,
  PrimaryButton,
  SecondaryButton,
  TextField
} from '../../components';
import { useTheme } from '../../styles';
import { lineStroke } from '../../assets/svg/lineStroke';

export const Login = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const [isChecked, setIsChecked] = useState(false);
  return (
    <AuthContainer>
      <AuthHeader name="Login" />
      <View style={utils.p_2}>
        <View style={utils.gap_2}>
          <TextField label="Email Address" />
          <PasswordField label="Password" />
        </View>
      </View>
      <View style={utils.px_2}>
        <View style={[utils.flex_dir_row, utils.justify_content_between, utils.align_items_center]}>
          <View style={[utils.flex_dir_row, utils.align_items_center]}>
            <Checkbox
              value={isChecked}
              onValueChange={() => setIsChecked(!isChecked)}
              color={isChecked ? theme.colors.primary : ''}
            />
            <BodyText style={[utils.pl_1, { color: theme.colors.slateGray }]}>Remember me</BodyText>
          </View>
          <Pressable style={({ pressed }) => [pressed && { opacity: 0.5 }]}>
            <BodyText style={{ color: theme.colors.primary }}>Forget password?</BodyText>
          </Pressable>
        </View>
        <View style={[utils.my_3, utils.gap_2]}>
          <PrimaryButton title="Continue" />
          <View style={styles.divider}>
            <SvgXml xml={lineStroke} />
            <BodyText style={{ fontSize: 16 }}>or</BodyText>
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
              <Pressable style={({ pressed }) => [pressed && { opacity: 0.5 }]}>
                <BodyText style={{ color: theme.colors.primary }}>Sign Up</BodyText>
              </Pressable>
            </View>
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
  }
});
