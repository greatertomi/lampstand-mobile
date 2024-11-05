import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { BodyText, BodyTextSmall } from '../Typography';
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
  onBlur?: () => void;
  error?: boolean | string;
};

export const DropdownPicker = ({ label, value, data, onChange, onBlur, error = false }: DropdownPickerProps) => {
  const { theme } = useTheme();
  const borderColor = error ? theme.colors.yellowError : theme.colors.cardBorderColor;
  const styles = createStyleSheet(theme, borderColor);

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
        onBlur={onBlur}
      />
      <View>{error && <BodyTextSmall style={styles.errorText}>{error}</BodyTextSmall>}</View>
    </View>
  );
};

const createStyleSheet = (theme: Theme, borderColor: string) =>
  StyleSheet.create({
    container: {
      padding: 16,
      gap: 8
    },
    dropdown: {
      height: 56,
      borderColor,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 8
    },
    errorText: {
      position: 'absolute',
      color: theme.colors.yellowError,
      marginTop: -6
    },
    placeholder: {
      color: theme.colors.text
    }
  });
