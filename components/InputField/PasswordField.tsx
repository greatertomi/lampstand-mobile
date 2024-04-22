import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BaseField, BaseFieldProps } from './BaseField';

export const PasswordField = (props: BaseFieldProps) => {
  const [passwordVisible, setPasswordVisible] = useState(true);

  return (
    <View style={[styles.container, props.style, styles.fill]}>
      <BaseField secureTextEntry={passwordVisible} {...props} />
      <TouchableOpacity
        style={styles.passwordEyeIcon}
        onPress={() => setPasswordVisible(!passwordVisible)}
      >
        {passwordVisible ? <Icon name="eye-outline" size={20} /> : <Icon name="eye-off-outline" size={20} />}
      </TouchableOpacity>
    </View>
  );
};

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
