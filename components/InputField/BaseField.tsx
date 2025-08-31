import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, TextInput, TextInputProps, TouchableOpacity, View, ViewStyle } from 'react-native';

import { Theme, fontFamily, fontSizes, fontWeights, useTheme } from '../../styles';
import { scaleFontSize } from '../../utils';
import { BodyText, BodyTextSmall, TypographyProps } from '../Typography';

export type BaseFieldProps = {
  label?: string;
  actionLabel?: ReactNode;
  placeholder?: string;
  required?: boolean;
  value?: string;
  fill?: boolean;
  readOnly?: boolean;
  icon?: ReactNode;
  onChangeText?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
  error?: boolean | string;
  multiline?: boolean;
  onActionLabelPress?: () => void;
  actionLabelStyle?: ViewStyle;
  actionLabelVariant?: TypographyProps['variant'];
  textAlignTop?: boolean;
} & TextInputProps;

export const BaseField = ({
  label,
  actionLabel,
  placeholder,
  required = false,
  icon,
  value,
  fill = true,
  error = false,
  readOnly = false,
  multiline = false,
  textAlignTop = false,
  onChangeText,
  onActionLabelPress,
  style,
  actionLabelStyle,
  actionLabelVariant,
  placeholderTextColor,
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
        {actionLabel && (
          <TouchableOpacity style={[styles.actionLabel, actionLabelStyle]} onPress={onActionLabelPress}>
            <BodyTextSmall variant={actionLabelVariant || 'warning'} style={utils.font_smaller}>
              {actionLabel}
            </BodyTextSmall>
          </TouchableOpacity>
        )}
        {required && <BodyText style={styles.aster}>*</BodyText>}
      </View>
      <View style={[styles.textInputContainer, readOnly && styles.readOnlyField]}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          placeholder={placeholder || label}
          placeholderTextColor={placeholderTextColor || theme.colors.secondaryText}
          cursorColor={theme.colors.text}
          readOnly={readOnly}
          multiline={multiline}
          style={[
            styles.textInput,
            fill && styles.fullWidth,
            { borderColor },
            style,
            icon ? styles.withIcon : styles.noIcon,
            textAlignTop && { textAlignVertical: 'top' }
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
      fontSize: scaleFontSize(fontSizes.body),
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
      fontFamily: fontFamily.plusJakartaSansBold
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
    },
    actionLabel: {
      backgroundColor: theme.colors.warningBackground,
      borderRadius: 10,
      paddingBottom: 2,
      paddingHorizontal: 6,
      marginLeft: 8,
      marginTop: 2
    }
  });
