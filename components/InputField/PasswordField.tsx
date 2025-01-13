import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
          <Icon name="eye-off-outline" size={20} color={theme.colors.icon} />
        ) : (
          <Icon name="eye-outline" size={20} color={theme.colors.icon} />
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
