import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { resetPasswordSuccess } from '../../assets/svg';
import { BodyText, HeadingLarge, PrimaryButton } from '../../components';
import { AuthContainer } from './AuthContainer';

export const ResetPasswordSuccess = () => (
  <AuthContainer>
    <View style={styles.container}>
      <SvgXml xml={resetPasswordSuccess} />
      <View style={styles.content}>
        <View style={styles.messageContent}>
          <HeadingLarge style={styles.message}>Password reset e-mail has been sent!</HeadingLarge>
          <BodyText style={styles.message}>A password email has been sent to your email address.</BodyText>
        </View>
        <PrimaryButton title="Continue" />
      </View>
    </View>
  </AuthContainer>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60
  },
  content: {
    top: 54,
    gap: 44
  },
  messageContent: {
    paddingHorizontal: 50,
    gap: 4
  },
  message: {
    textAlign: 'center'
  }
});
