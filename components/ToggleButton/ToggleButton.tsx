import React from 'react';
import { View, Switch, StyleSheet, SwitchProps } from 'react-native';

export type ToggleButtonProps = {
  backgroundColor: string;
  color: string;
  onValueChange: (value: boolean) => void;
  isEnabled: boolean;
} & SwitchProps;

export const ToggleButton = ({ color, backgroundColor, onValueChange, isEnabled, ...rest }: ToggleButtonProps) => (
  <View style={[styles.container, { backgroundColor }]}>
    <Switch
      trackColor={{ false: backgroundColor, true: backgroundColor }}
      thumbColor={color}
      onValueChange={onValueChange}
      value={isEnabled}
      {...rest}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 23,
    width: 43,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    paddingHorizontal: 26,
    paddingVertical: 16
  }
});
