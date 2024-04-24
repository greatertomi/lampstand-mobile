import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BaseField, BaseFieldProps } from './BaseField';

export type PasswordFieldProps = {
  passwordVisible: boolean;
  setPasswordVisible: (value: boolean) => void;
} & BaseFieldProps;

export const PasswordField = ({ passwordVisible, setPasswordVisible, style, ...rest }: PasswordFieldProps) => (
  <View style={[styles.container, style, styles.fill]}>
    <BaseField secureTextEntry={passwordVisible} {...rest} />
    <Pressable style={styles.passwordEyeIcon} onPress={() => setPasswordVisible(!passwordVisible)}>
      {passwordVisible ? <Icon name="eye-outline" size={20} /> : <Icon name="eye-off-outline" size={20} />}
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingVertical: 6
  },
  fill: {
    width: '100%'
  },
  passwordEyeIcon: {
    position: 'absolute',
    right: 10,
    top: 22
  }
});
