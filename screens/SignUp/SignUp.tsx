import React from 'react';
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Theme, useTheme } from '../../styles';
import { BodyText, HeadingLarge, PrimaryButton, SecondaryButton } from '../../components';
import { PasswordField, TextField } from '../../components/InputField';
import { lineStroke } from '../../assets/svg/lineStroke';

export const SignUp = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const utils = theme.utilities;
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../../assets/signup.png')} style={styles.backgroundImage} />
      <HeadingLarge style={utils.pl_2}>Sign Up</HeadingLarge>
      <View style={[utils.p_2, utils.mt_2]}>
        <View style={utils.gap_2}>
          <TextField label="Full Name" />
          <TextField label="Email Address" />
          <PasswordField label="Password" />
          <PasswordField label="Confirm Password" />
        </View>
        <View style={[utils.my_3, utils.gap_2]}>
          <PrimaryButton title="Continue" />
          <View
            style={[
              utils.flex_dir_row,
              utils.justify_content_center,
              utils.align_items_center,
              utils.gap_1,
              { opacity: 0.3 }
            ]}
          >
            <SvgXml xml={lineStroke} />
            <BodyText style={{ fontSize: 16 }}>or</BodyText>
            <SvgXml xml={lineStroke} />
          </View>
          <View style={utils.gap_2}>
            <SecondaryButton
              title="Continue with Google"
              icon={<Image source={require('../../assets/google.png')} style={styles.icon} />}
              style={styles.secondaryButton}
            />
            <View style={[utils.align_items_center, utils.justify_content_center]}>
              <BodyText>
                Already have an account? <Text style={{ color: theme.colors.primary }}>Sign In</Text>
              </BodyText>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    backgroundImage: {
      width: '100%',
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      resizeMode: 'cover'
    },

    container: {
      flex: 1,
      width: '100%',
      backgroundColor: theme.colors.background
    },
    secondaryButton: {
      borderColor: theme.colors.lightGray
    },
    icon: {
      resizeMode: 'contain',
      width: 32,
      height: 32
    }
  });
