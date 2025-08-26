import * as AppleAuthentication from 'expo-apple-authentication';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, View, StyleSheet } from 'react-native';

import { Theme, ThemeModeScheme, useTheme } from '../../styles';

interface SignInWithAppleButtonProps {
  onPress: () => void;
  loading?: boolean;
}

export const SignInWithAppleButton = ({ onPress, loading = false }: SignInWithAppleButtonProps) => {
  const { mode, theme } = useTheme();
  const [isAvailable, setIsAvailable] = useState(false);

  const styles = createStyles(theme, mode);

  useEffect(() => {
    if (Platform.OS !== 'ios') return;

    AppleAuthentication.isAvailableAsync().then(setIsAvailable);
  }, []);

  if (!isAvailable) return null;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={mode === 'dark' ? theme.colors.black : theme.colors.white} size="small" />
      </View>
    );
  }

  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
      buttonStyle={
        mode === 'dark'
          ? AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
          : AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
      }
      cornerRadius={theme.radius.medium}
      style={{ width: '100%', height: 45 }}
      onPress={onPress}
    />
  );
};

const createStyles = (theme: Theme, mode: ThemeModeScheme) =>
  StyleSheet.create({
    loadingContainer: {
      width: '100%',
      height: 45,
      backgroundColor: mode === 'dark' ? theme.colors.white : theme.colors.black,
      borderRadius: theme.radius.medium,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.7
    }
  });
