import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import { Theme, fontFamily, fontSizes, fontWeights, useTheme } from '../../styles';
import { BodyText, BodyTextSmall } from '../Typography';

export type BaseFieldProps = {
  label: string;
  placeholder?: string;
  required: boolean;
  value?: string;
  fill?: boolean;
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
  onChangeText,
  style,
  ...rest
}: BaseFieldProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const utils = theme.utilities;
  const borderColor = error ? theme.colors.error : theme.colors.border;

  return (
    <View style={styles.container}>
      <View style={[utils.flex_dir_row, utils.align_items_start]}>
        <BodyText style={styles.label}>{label}</BodyText>
        {required && <BodyText style={styles.aster}>*</BodyText>}
      </View>
      <View style={styles.textInputContainer}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          placeholder={placeholder || label}
          placeholderTextColor={theme.colors.slateGray}
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
      <View>
        {error && <BodyTextSmall style={styles.errorText}>{error}</BodyTextSmall>}
      </View>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
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
      fontSize: fontSizes.body,
      fontWeight: fontWeights.medium,
      fontFamily: fontFamily.plusJakartaSans,
      height: 56
    },
    fullWidth: {
      width: '100%'
    },
    iconContainer: {
      marginRight: 10,
      color: theme.colors.icon,
      left: 10
    },
    withIcon: {
      paddingHorizontal: 34
    },
    noIcon: {
      paddingHorizontal: 10
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
    }
  });
