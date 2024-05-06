import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Theme, useTheme } from '../../styles';

type AuthContainerProps = {
  children: ReactNode;
};

export const AuthContainer = ({ children }: AuthContainerProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return <View style={styles.container}>{children}</View>;
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: theme.colors.background
    }
  });
