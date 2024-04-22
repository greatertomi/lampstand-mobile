import { StyleProp, StyleSheet, TextInput, TextInputProps, ViewStyle } from 'react-native';
import { Theme, fontFamily, fontSizes, fontWeights, useTheme } from '../../styles';

export type TextFieldProps = {
  label: string;
  value?: string;
  fill?: boolean;
  onChangeText?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
} & TextInputProps;

export const TextField = ({ label, value, fill, onChangeText, style, ...rest }: TextFieldProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  return (
    <TextInput
      placeholder={label}
      style={[styles.textInput, fill && styles.fullWidth, style]}
      onChangeText={onChangeText}
      value={value}
      {...rest}
    />
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    textInput: {
      borderWidth: 1, // add a utility class for border width
      borderRadius: theme.radius.tiny,
      borderColor: theme.colors.borderColor,
      padding: 10, // use a utility class here
      color: theme.colors.inputFieldColor,
      fontSize: fontSizes.body,
      fontWeight: fontWeights.medium,
      fontFamily: fontFamily.plusJakartaSans
    },
    fullWidth: {
      width: '100%'
    }
  });
