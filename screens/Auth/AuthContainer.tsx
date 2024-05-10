import React, { ReactNode } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Theme, useTheme } from '../../styles';
import { HeadingLarge } from '../../components';

type AuthContainerProps = {
  children: ReactNode;
  title: string;
};

export const AuthContainer = ({ children, title }: AuthContainerProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const utils = theme.utilities;

  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../../assets/images/book-bg.jpg')} style={styles.backgroundImage} />
        <HeadingLarge style={[utils.px_2]}>{title}</HeadingLarge>
      </View>
      <View style={utils.p_2}>{children}</View>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: theme.colors.background
    },
    backgroundImage: {
      marginTop: -300,
      resizeMode: 'repeat'
    }
  });
