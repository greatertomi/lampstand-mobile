import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, TextInput, TextInputProps, View, ViewStyle } from 'react-native';

import { Theme, fontFamily, fontSizes, fontWeights, useTheme } from '../../styles';
import { BodyText, BodyTextSmall } from '../Typography';

export type BaseFieldProps = {
  label: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  fill?: boolean;
  readOnly?: boolean;
  icon?: ReactNode;
  onChangeText?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
  error?: boolean | string;
} & TextInputProps;

export const BaseField = ({
  label,
  placeholder,
  required = false,
  icon,
  value,
  fill = true,
  error = false,
  readOnly = false,
  onChangeText,
  style,
  ...rest
}: BaseFieldProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme, readOnly);
  const utils = theme.utilities;
  const borderColor = error ? theme.colors.error : theme.colors.border;

  return (
    <View style={styles.container}>
      <View style={[utils.flex_dir_row, utils.align_items_start]}>
        <BodyText bold style={styles.label}>
          {label}
        </BodyText>
        {required && <BodyText style={styles.aster}>*</BodyText>}
      </View>
      <View style={[styles.textInputContainer, readOnly && styles.readOnlyField]}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          placeholder={placeholder || label}
          placeholderTextColor={theme.colors.secondaryText}
          cursorColor={theme.colors.text}
          readOnly={readOnly}
          style={[
            styles.textInput,
            fill && styles.fullWidth,
            style,
            icon ? styles.withIcon : styles.noIcon,
            { borderColor }
          ]}
          onChangeText={onChangeText}
          value={value}
          {...rest}
        />
      </View>
      <View>{error && <BodyTextSmall style={styles.errorText}>{error}</BodyTextSmall>}</View>
    </View>
  );
};

const createStyleSheet = (theme: Theme, readOnly: boolean) =>
  StyleSheet.create({
    container: {
      gap: 8,
      position: 'relative'
    },
    textInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    },
    textInput: {
      flex: 1,
      borderWidth: 1,
      borderRadius: theme.radius.tiny,
      paddingVertical: 10,
      color: readOnly ? theme.colors.secondaryText : theme.colors.text,
      fontSize: fontSizes.body,
      fontWeight: fontWeights.medium,
      fontFamily: fontFamily.plusJakartaSans,
      height: 56
    },
    fullWidth: {
      width: '100%'
    },
    iconContainer: {
      position: 'absolute',
      marginRight: 10,
      color: theme.colors.secondaryText,
      left: 10
    },
    withIcon: {
      paddingLeft: 38
    },
    noIcon: {
      paddingLeft: 10
    },
    label: {
      fontWeight: 'bold'
    },
    aster: {
      color: theme.colors.primary,
      marginTop: -4
    },
    errorText: {
      position: 'absolute',
      color: theme.colors.error,
      marginTop: -6
    },
    readOnlyField: {
      backgroundColor: theme.colors.readOnlyFieldBackground,
      borderRadius: theme.radius.tiny
    }
  });
