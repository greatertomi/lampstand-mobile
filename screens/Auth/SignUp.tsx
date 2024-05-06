import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Theme, useTheme } from '../../styles';
import { BodyText, HeadingLarge, PrimaryButton, SecondaryButton, PasswordField, TextField } from '../../components';
import { lineStroke } from '../../assets/svg/lineStroke';

export const SignUp = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const utils = theme.utilities;
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/book-bg.jpg')} style={styles.backgroundImage} />
      <HeadingLarge style={[utils.px_2, utils.pt_1]}>Sign Up</HeadingLarge>
      <View style={utils.p_2}>
        <View style={utils.gap_2}>
          <TextField label="Full Name" />
          <TextField label="Email Address" />
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
                Already have an account? <Text style={{ color: theme.colors.primary }}>Sign In</Text>
              </BodyText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    backgroundImage: {
      marginTop: -300,
      resizeMode: 'repeat'
    },
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: theme.colors.background
    },
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
