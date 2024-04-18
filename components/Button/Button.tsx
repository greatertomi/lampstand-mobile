import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ButtonProps } from '../../types';
import { colors } from '../../colors/colors';

export const Button: React.FC<ButtonProps> = ({ title, icon, type = 'primary', onClick }) => {
  const buttonStyles = [
    styles.button,
    type === 'primary' ? styles.primary : styles.secondary,
    type === 'tetiary' && styles.tetiary
  ];
  const textStyle = [
    styles.title,
    type === 'primary' ? styles.primaryText : styles.secondaryText,
    type === 'tetiary' && styles.tetiaryText
  ];

  return (
    <Pressable style={buttonStyles} onPress={onClick}>
      <View style={styles.buttonContent}>
        {icon && <View>{icon}</View>}
        <Text style={textStyle}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 24
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24
  },
  primaryText: {
    color: colors.white
  },
  secondaryText: {
    color: colors.primary
  },
  tetiaryText: {
    color: colors.secondary
  },
  primary: {
    backgroundColor: colors.primary
  },
  secondary: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary
  },
  tetiary: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.secondary
  }
});
