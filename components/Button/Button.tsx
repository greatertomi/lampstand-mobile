import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export interface ButtonProps {
  label: string;
}

export const Button = ({ label }: ButtonProps) => (
  <View style={styles.button}>
    <Text style={styles.text}>{label}</Text>
  </View>
);

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
