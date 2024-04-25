import React from 'react';
import { View, Switch, StyleSheet, SwitchProps } from 'react-native';
import { useTheme } from '../../styles';

export type ToggleButtonProps = {
  primary: boolean;
  onValueChange: (value: boolean) => void;
  isEnabled: boolean;
} & SwitchProps;

export const ToggleButton = ({ primary, isEnabled, onValueChange, ...rest }: ToggleButtonProps) => {
  const { theme } = useTheme();
  const backgroundColor = primary ? theme.colors.primary : theme.colors.text;
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
