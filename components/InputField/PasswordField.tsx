import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BaseField, BaseFieldProps } from './BaseField';

export const PasswordField = ({ style, ...rest }: BaseFieldProps) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  return (
    <View style={[styles.container, style, styles.fill]}>
      <BaseField secureTextEntry={isPasswordHidden} {...rest} />
      <Pressable style={styles.passwordEyeIcon} onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
        {isPasswordHidden ? <Icon name="eye-outline" size={20} /> : <Icon name="eye-off-outline" size={20} />}
      </Pressable>
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
