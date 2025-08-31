import React, { useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { fontFamily, Theme, useTheme } from '../../styles';
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
  borderSize?: 'sm' | 'lg';
  dropdownStyles?: ViewStyle;
  containerStyles?: ViewStyle;
  dropDownContainerStyles?: ViewStyle;
  placeholder?: string;
  onOpen?: () => void;
  onClose?: () => void;
};

export const DropdownPicker = ({
  label,
  value,
  data,
  onChange,
  onBlur,
  error = false,
  borderSize = 'sm',
  dropdownStyles,
  containerStyles,
  dropDownContainerStyles,
  placeholder,
  onOpen,
  onClose
}: DropdownPickerProps) => {
  const { theme } = useTheme();
  const borderColor = error ? theme.colors.error : theme.colors.border;
  const borderRadius = borderSize === 'sm' ? 8 : 40;
  const styles = createStyleSheet(theme, borderColor, borderRadius);
  const items = data.map((item) => ({ label: item.label, value: item.value }));
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={[styles.container, containerStyles]}>
      <BodyText bold>{label}</BodyText>
      <DropDownPicker
        open={isOpen}
        value={value}
        items={items}
        setOpen={setIsOpen}
        setValue={(callback) => {
          const newValue = callback(value);
          const selectedItem = data.find((item) => item.value === newValue);
          if (selectedItem) onChange(selectedItem);
        }}
        placeholder={placeholder || 'Select Item'}
        textStyle={styles.textStyle}
        dropDownContainerStyle={[styles.dropDownContainerStyle, dropDownContainerStyles]}
        style={[styles.dropdown, { borderColor }, dropdownStyles]}
        tickIconStyle={styles.tickStyle}
        arrowIconStyle={styles.tickStyle}
        selectedItemLabelStyle={styles.selectedItemLabel}
        maxHeight={300}
        activityIndicatorColor={theme.colors.error}
        zIndex={3000}
        zIndexInverse={2000}
        onOpen={onOpen}
        onClose={() => {
          onBlur?.();
          onClose?.();
        }}
        listMode="SCROLLVIEW"
      />
      <View>{error && <BodyTextSmall style={styles.errorText}>{error}</BodyTextSmall>}</View>
    </View>
  );
};

const createStyleSheet = (theme: Theme, borderColor: string, borderRadius: number) =>
  StyleSheet.create({
    container: {
      gap: 8
    },
    dropdown: {
      height: 56,
      borderColor,
      borderWidth: 1,
      borderRadius,
      paddingHorizontal: 8
    },
    selectedItemLabel: {
      fontWeight: 'bold',
      color: theme.colors.primary
    },
    errorText: {
      position: 'absolute',
      color: theme.colors.error,
      marginTop: -6
    },
    dropDownContainerStyle: {
      backgroundColor: theme.colors.cardBackground,
      borderColor: theme.colors.border,
      marginTop: 2,
      marginBottom: 2
    },
    textStyle: {
      color: theme.colors.text,
      fontFamily: fontFamily.plusJakartaSans
    },
    tickStyle: {
      tintColor: theme.colors.text,
      width: 20,
      height: 20
    }
  });
