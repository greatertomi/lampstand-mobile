import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import { Theme, useTheme } from '../../styles';
import { BodyText, BodyTextSmall } from '../Typography';

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
  const borderColor = error ? theme.colors.error : theme.colors.border;
  const styles = createStyleSheet(theme, borderColor);

  return (
    <View style={styles.container}>
      <BodyText bold>{label}</BodyText>
      <Dropdown
        style={styles.dropdown}
        selectedTextStyle={{ color: theme.colors.text }}
        placeholderStyle={{ color: theme.colors.text }}
        itemContainerStyle={styles.itemContainer}
        itemTextStyle={{ color: theme.colors.text }}
        activeColor={theme.colors.background}
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
      gap: 8
    },
    itemContainer: {
      backgroundColor: theme.colors.cardBackground,
      color: theme.colors.text
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
      color: theme.colors.error,
      marginTop: -6
    },
    placeholder: {
      color: theme.colors.text
    }
  });
