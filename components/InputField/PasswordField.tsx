import Feather from '@expo/vector-icons/Feather';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { useTheme } from '../../styles';
import { PressableItem } from '../Pressable';

import { BaseField, BaseFieldProps } from './BaseField';

export const PasswordField = ({ style, ...rest }: BaseFieldProps) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const { theme } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <BaseField secureTextEntry={isPasswordHidden} {...rest} />
      <PressableItem style={styles.passwordEyeIcon} onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
        {isPasswordHidden ? (
          <Feather name="eye-off" size={20} color={theme.colors.text} />
        ) : (
          <Feather name="eye" size={20} color={theme.colors.text} />
        )}
      </PressableItem>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center'
  },
  passwordEyeIcon: {
    position: 'absolute',
    top: '50%',
    right: 12
  }
});
