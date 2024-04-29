import React from 'react';
import { View, Switch, StyleSheet, SwitchProps } from 'react-native';
import { useTheme } from '../../styles';

export type ToggleButtonProps = {
  onValueChange: (value: boolean) => void;
  isEnabled: boolean;
} & SwitchProps;

export const ToggleButton = ({ isEnabled, onValueChange, ...rest }: ToggleButtonProps) => {
  const { theme } = useTheme();
  const backgroundColor = isEnabled ? theme.colors.primary : theme.colors.text;
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Switch
        trackColor={{ false: backgroundColor, true: backgroundColor }}
        thumbColor={theme.colors.highlight}
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
