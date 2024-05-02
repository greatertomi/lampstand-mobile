import React from 'react';
import { View, Switch, StyleSheet, SwitchProps } from 'react-native';
import { useTheme } from '../../styles';

export type ToggleButtonProps = {
  onValueChange: (value: boolean) => void;
  isEnabled: boolean;
} & SwitchProps;

export const ToggleButton = ({ isEnabled, onValueChange, ...rest }: ToggleButtonProps) => {
  const { theme } = useTheme();
  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: theme.colors.inactiveToggleButtonBackground, true: theme.colors.primary }}
        thumbColor={theme.colors.toggleButtonThumb}
        onValueChange={onValueChange}
        value={isEnabled}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 23,
    width: 43,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    paddingHorizontal: 22,
    paddingVertical: 12
  }
});
