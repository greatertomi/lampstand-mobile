import React from 'react';
import { Text, View } from 'react-native';
import { Theme, useTheme } from '../../styles';

export interface ButtonProps {
  label: string;
}

export const Button = ({ label }: ButtonProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <View style={styles.button}>
      <Text style={[styles.text]}>{label}</Text>
    </View>
  );
};

const createStyleSheet = (theme: Theme) => ({
  button: {
    backgroundColor: theme.colors.buttonPrimaryContainerBackground,
    padding: 10,
    borderRadius: 5
  },
  text: {
    color: theme.colors.buttonPrimaryLabel
  }
});
