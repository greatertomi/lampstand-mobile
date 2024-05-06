import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useTheme } from '../../styles';
import { BodyText, PrimaryButton, SecondaryButton, PasswordField, TextField, LinkText } from '../../components';
import { lineStroke } from '../../assets/svg/lineStroke';
import { AuthContainer } from './AuthContainer';

export const SignUp = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;

  return (
    <AuthContainer name="Sign Up">
      <View style={utils.gap_2}>
        <TextField label="Full Name" />
        <TextField label="Email Address" inputMode="email" autoCapitalize="none" />
        <PasswordField label="Password" />
        <PasswordField label="Confirm Password" />
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
          <View style={[utils.align_items_center, utils.justify_content_center, utils.mt_1]}>
            <BodyText>
              Already have an account?
              <LinkText variant="primary" style={{ color: theme.colors.primary }}>
                Sign In
              </LinkText>
            </BodyText>
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
  }
});
