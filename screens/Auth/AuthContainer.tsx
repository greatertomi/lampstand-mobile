import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { HeadingLarge } from '../../components';
import { Theme, useTheme } from '../../styles';

type AuthContainerProps = {
  children: ReactNode;
  title?: string;
};

export const AuthContainer = ({ children, title }: AuthContainerProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const utils = theme.utilities;

  return (
    <View style={styles.container}>
      <View>
        <HeadingLarge bold style={[utils.px_2, styles.header]}>
          {title}
        </HeadingLarge>
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
    },
    header: {
      marginTop: 100
    }
  });
