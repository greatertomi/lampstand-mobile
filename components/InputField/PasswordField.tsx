import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BaseField, BaseFieldProps } from './BaseField';
import { useTheme } from '../../styles';

export const PasswordField = ({ style, ...rest }: BaseFieldProps) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const { theme } = useTheme();

  return (
    <View style={[styles.container, style, styles.fill]}>
      <BaseField secureTextEntry={isPasswordHidden} {...rest} />
      <Pressable style={styles.passwordEyeIcon} onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
        {isPasswordHidden ? (
          <Icon name="eye-off-outline" size={20} color={theme.colors.icon} />
        ) : (
          <Icon name="eye-outline" size={20} color={theme.colors.icon} />
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center'
  },
  fill: {
    width: '100%'
  },
  passwordEyeIcon: {
    position: 'absolute',
    right: 12,
  }
});
