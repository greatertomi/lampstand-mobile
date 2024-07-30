import Checkbox, { CheckboxProps } from 'expo-checkbox';
import { StyleSheet, View } from 'react-native';
import React, { ReactNode } from 'react';
import { Theme, useTheme } from '../../styles';
import { BodyText, BodyTextSmall } from '../Typography';

export type CheckBoxType = {
  label?: string | ReactNode;
  isChecked: boolean;
  onValueChange: (value: boolean) => void;
  variant: 'grey' | 'text';
  error?: boolean | string;
} & CheckboxProps;

export const CheckBox = ({ label, isChecked, onValueChange, error, variant = 'text', ...rest }: CheckBoxType) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);

  return (
    <>
      <View style={[utils.flex_dir_row, utils.align_items_center]}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={onValueChange}
          color={isChecked ? theme.colors.primary : theme.colors.slateGray}
          {...rest}
        />
        <BodyText style={variant === 'text' ? styles.text : styles.grey}>{label}</BodyText>
      </View>
      {error && <BodyTextSmall style={styles.error}>{error}</BodyTextSmall>}
    </>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    checkbox: {
      width: 16,
      height: 16,
      borderWidth: 1,
      marginRight: 4
    },
    grey: {
      color: theme.colors.slateGray
    },
    text: {
      color: theme.colors.text
    },
    error: {
      marginTop: -8,
      color: theme.colors.error
    }
  });
