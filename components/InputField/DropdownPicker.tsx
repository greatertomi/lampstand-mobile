import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { BodyText } from '../Typography';
import { Theme, useTheme } from '../../styles';

export type DropdownData = {
  label: string;
  value: string;
};

export type DropdownPickerProps = {
  label?: string;
  value: string;
  data: DropdownData[];
  onChange: (item: DropdownData) => void;
};

export const DropdownPicker = ({ label, value, data, onChange }: DropdownPickerProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <View style={styles.container}>
      <BodyText bold>{label}</BodyText>
      <Dropdown
        style={styles.dropdown}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        value={value}
        onChange={onChange}
      />
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      padding: 16,
      gap: 8
    },
    dropdown: {
      height: 56,
      borderColor: theme.colors.cardBorderColor,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 8
    }
  });
