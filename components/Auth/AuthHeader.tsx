import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { HeadingLarge } from '../Typography';
import { useTheme } from '../../styles';

type AuthHeaderType = {
  name: string;
};

export const AuthHeader = ({ name }: AuthHeaderType) => {
  const { theme } = useTheme();
  const utils = theme.utilities;

  return (
    <View>
      <Image source={require('../../assets/images/book-bg.jpg')} style={styles.backgroundImage} />
      <HeadingLarge style={[utils.px_2, utils.pt_1]}>{name}</HeadingLarge>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    marginTop: -300,
    resizeMode: 'repeat'
  }
});
