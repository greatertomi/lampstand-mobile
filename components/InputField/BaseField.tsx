import { ReactNode } from 'react';
import { StyleProp, StyleSheet, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import { Theme, fontFamily, fontSizes, fontWeights, useTheme } from '../../styles';

export type BaseFieldProps = {
  label: string;
  value?: string;
  fill?: boolean;
  icon?: ReactNode;
  onChangeText?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
} & TextInputProps;

export const BaseField = ({ label, icon, value, fill = true, onChangeText, style, ...rest }: BaseFieldProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  return (
    <View style={styles.container}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <TextInput
        placeholder={label}
        style={[styles.textInput, fill && styles.fullWidth, style, icon ? styles.withIcon : styles.noIcon]}
        onChangeText={onChangeText}
        value={value}
        {...rest}
      />
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    },
    textInput: {
      flex: 1,
      borderWidth: 1,
      borderRadius: theme.radius.tiny,
      borderColor: theme.colors.border,
      paddingVertical: 10,
      color: theme.colors.inputFieldValue,
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
      position: 'absolute',
      color: theme.colors.icon,
      left: 10
    },
    withIcon: {
      paddingHorizontal: 34
    },
    noIcon: {
      paddingHorizontal: 10
    }
  });
