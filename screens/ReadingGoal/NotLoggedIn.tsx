import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { BodyText, BodyTextSmall, PrimaryButton } from '../../components';
import { RootStackParamList } from '../../routes';
import { Theme, useTheme, utilities } from '../../styles';

type SignUpNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

export const NotLoggedIn = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const navigation = useNavigation<SignUpNavigationProp>();

  return (
    <View style={styles.nullUser}>
      <Image source={require('../../assets/images/notLoggedIn.png')} style={styles.image} />
      <View style={styles.textContainer}>
        <BodyText bold>Lampstand account</BodyText>
        <BodyTextSmall>
          With a lampstand account, you can purchase from partnered store and access the reading goals feature , in
          order to track your reading!{' '}
        </BodyTextSmall>
        <View style={utilities.width_50}>
          <PrimaryButton title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
        </View>
      </View>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    nullUser: {
      height: 185,
      marginTop: 40,
      borderWidth: 1,
      flexDirection: 'row',
      borderColor: theme.colors.border,
      borderRadius: 10,
      paddingVertical: 9,
      paddingHorizontal: 14,
      alignItems: 'center',
      gap: 16
    },
    image: {
      width: '30%',
      height: '100%',
      borderRadius: 10
    },
    textContainer: {
      width: '65%',
      gap: 16
    }
  });
