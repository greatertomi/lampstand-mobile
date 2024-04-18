import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useTheme } from '../../styles';

export interface ButtonProps {
  label: string;
}

export const Button = ({ label }: ButtonProps) => {
  const { theme } = useTheme();

  console.log('theme', theme.colors.primary);

  return (
    <View style={styles.button}>
      <Text style={[styles.text, theme.utilities.mt3]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5
  },
  text: {
    color: 'white'
  }
});
