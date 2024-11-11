import { StyleSheet, View } from 'react-native';
import { ReactNode } from 'react';
import { IconButton, TypographyProps } from '../../../components';
import { Theme, useTheme } from '../../../styles';

type SettingsCardProps = Pick<TypographyProps, 'variant' | 'bold'> & {
  setting: string | ReactNode;
  title?: string | ReactNode;
  backgroundColor?: string;
  textColor?: string;
};

export const SettingsCard = ({ setting, title, backgroundColor, textColor }: SettingsCardProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme, backgroundColor, textColor);

  return (
    <IconButton>
      <View style={styles.iconButton}>
        <View style={styles.container}>{setting}</View>
      </View>
      <View style={styles.text}>{title}</View>
    </IconButton>
  );
};

const createStyleSheet = (theme: Theme, backgroundColor?: string, textColor?: string) =>
  StyleSheet.create({
    iconButton: {
      borderWidth: 1,
      borderColor: theme.colors.text,
      borderRadius: 10
    },
    container: {
      borderRadius: 10,
      paddingVertical: 16,
      paddingHorizontal: 32,
      color: textColor,
      backgroundColor
    },
    text: {
      alignSelf: 'center',
      marginTop: 6
    }
  });
