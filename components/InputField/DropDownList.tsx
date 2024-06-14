import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, View } from 'react-native';
import { Theme, useTheme, utilities } from '../../styles';
import { BodyText } from '../Typography';

export type DropDownListProps = {
  label: string;
  value: string | number;
  data: { label: string; value: number | string }[];
  handleOnChange?: (value: number | string) => void;
};

export const DropDownList = ({ data, value, label, handleOnChange }: DropDownListProps) => {
  const { theme } = useTheme();
  const styles = createStylesheet(theme);

  return (
    <View style={utilities.gap_1}>
      <BodyText bold>{label}</BodyText>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={value}
          onValueChange={(itemValue) => handleOnChange && handleOnChange(itemValue)}
          style={styles.picker}
        >
          {data.map((item) => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const createStylesheet = (theme: Theme) =>
  StyleSheet.create({
    pickerContainer: {
      borderWidth: 0.5,
      borderColor: theme.colors.cardBorderColor,
      borderRadius: 5,
      overflow: 'hidden'
    },
    picker: {
      width: '100%'
    },
    label: {
      marginBottom: 4
    }
  });
