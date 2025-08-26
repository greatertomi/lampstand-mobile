import * as AppleAuthentication from 'expo-apple-authentication';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { useTheme } from '../../styles';

interface SignInWithAppleButtonProps {
  onPress: () => void;
}

export const SignInWithAppleButton = ({ onPress }: SignInWithAppleButtonProps) => {
  const { mode, theme } = useTheme();
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    if (Platform.OS !== 'ios') return;

    AppleAuthentication.isAvailableAsync().then(setIsAvailable);
  }, []);

  if (!isAvailable) return null;

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
