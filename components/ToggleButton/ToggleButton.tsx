import React, { useState } from 'react';
import { View, Switch, StyleSheet, ViewProps } from 'react-native';

export type ToggleButtonProps = {
  backgroundColor: string;
  color: string;
} & ViewProps;

export const ToggleButton = (props: ToggleButtonProps) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const { color, backgroundColor, ...rest } = props;
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Switch
        trackColor={{ false: backgroundColor, true: backgroundColor }}
        thumbColor={isEnabled ? color : color}
        onValueChange={() => setIsEnabled(!isEnabled)}
        value={isEnabled}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 23.83,
    width: 43.33,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50, //utility classes
    paddingHorizontal: 26, //utility classes
    paddingVertical: 16 //utility classes
  }
});
