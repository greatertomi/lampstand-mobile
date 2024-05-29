import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { StyleSheet, View } from 'react-native';
import { Theme, useTheme } from '../../styles';
import { BodyText } from '../Typography';

export type DropDownListProps = {
  label: string;
  placeholder?: string;
  value: string | number;
  data: { label: string; value: number | string }[];
  handleOnChange?: (value: number | string) => void;
};

export const DropDownList = ({ data, label, placeholder, value, handleOnChange }: DropDownListProps) => {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const styles = createStylesheet(theme);

  return (
    <View>
      <BodyText bold style={styles.label}>
        {label}
      </BodyText>
      <DropDownPicker
        open={open}
        value={value}
        items={data}
        placeholder={placeholder || label}
        setOpen={setOpen}
        setValue={(callbackValue) => {
          if (handleOnChange) {
            handleOnChange(callbackValue as unknown as string | number);
          }
        }}
        style={styles.picker}
        textStyle={styles.itemStyle}
        dropDownContainerStyle={styles.dropDownContainer}
      />
    </View>
  );
};

const createStylesheet = (theme: Theme) =>
  StyleSheet.create({
    picker: {
      borderWidth: 0.5,
      borderColor: theme.colors.cardBorderColor,
      width: '100%',
      zIndex: -10
    },
    itemStyle: {
      borderWidth: 0,
      fontSize: theme.fontSizes.body
    },
    label: {
      marginBottom: 4
    },
    dropDownContainer: {
      borderWidth: 0
    }
  });
