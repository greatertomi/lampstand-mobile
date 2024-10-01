import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { BodyText, BodyTextSmall, PrimaryButton } from '../components';
import { RootStackParamList } from '../routes';
import { Theme, useTheme, utilities } from '../styles';
import { Outline } from '../components/Button/stories/OutlinedButton.stories';

type SignUpNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

export const NotLoggedIn = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const navigation = useNavigation<SignUpNavigationProp>();

  return (
    <View style={styles.nullUser}>
      <BodyText bold>Lampstand account</BodyText>
      <BodyTextSmall style={utilities.text_center}>
        Sign up with Lampstand to access exclusive features and enjoy a personalized, seamless experience.
      </BodyTextSmall>
      <View style={styles.buttons}>
        <PrimaryButton title="Sign Up" onPress={() => navigation.navigate('SignUp')} style={utilities.width_50} />
        <Outline
          title="Log in"
          onPress={() => navigation.navigate('Login')}
          style={utilities.width_50}
          textStyles={{ color: theme.colors.primary }}
        />
      </View>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    nullUser: {
      height: 185,
      marginTop: 60,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      gap: 16
    },
    buttons: {
      marginTop: 4,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      gap: 16
    }
  });
