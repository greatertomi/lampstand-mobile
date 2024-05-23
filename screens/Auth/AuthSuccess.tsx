import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { resetPasswordSuccess } from '../../assets/svg';
import { BodyText, HeadingLarge, PrimaryButton } from '../../components';
import { AuthContainer } from './AuthContainer';
import { utilities } from '../../styles';

export const AuthSuccess = () => (
  <AuthContainer showImage={false}>
    <View style={styles.container}>
      <SvgXml xml={resetPasswordSuccess} />
      <View style={styles.content}>
        <View style={styles.messageContent}>
          <HeadingLarge style={utilities.text_center}>Password reset e-mail has been sent!</HeadingLarge>
          <BodyText style={utilities.text_center}>A password email has been sent to your email address.</BodyText>
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
    top: 240
  },
  content: {
    top: 74,
  },
  messageContent: {
    paddingHorizontal: 50,
    gap: 8,
    marginBottom: 44
  }
});
