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
        style={[styles.textInput, fill && styles.fullWidth, style, icon ? styles.withIcon : styles.NoIcon]}
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
      alignItems: 'center'
    },
    textInput: {
      flex: 1,
      position: 'relative',
      borderWidth: 1,
      borderRadius: theme.radius.tiny,
      borderColor: theme.colors.borderColor,
      paddingVertical: 10,
      color: theme.colors.inputFieldColor,
      fontSize: fontSizes.body,
      fontWeight: fontWeights.medium,
      fontFamily: fontFamily.plusJakartaSans
    },
    fullWidth: {
      width: '100%'
    },
    iconContainer: {
      marginRight: 10,
      position: 'absolute',
      top: 15,
      left: 10
    },
    withIcon: {
      paddingHorizontal: 34
    },
    NoIcon: {
      paddingHorizontal: 10
    }
  });
