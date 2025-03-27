import { StyleSheet } from 'react-native';

import { BodyTextSmall, PressableItem } from '../../../components';
import { Theme, useTheme } from '../../../styles';

type SingleDateProps = {
  day: string;
  num: number;
  isSelected: boolean;
  onPress: () => void;
};

export const SingleDate = ({ day, num, onPress, isSelected }: SingleDateProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme, isSelected);

  return (
    <PressableItem style={styles.container} onPress={onPress}>
      <BodyTextSmall variant="secondary">{day}</BodyTextSmall>
      <BodyTextSmall variant="secondary">{num}</BodyTextSmall>
    </PressableItem>
  );
};

const createStyleSheet = (theme: Theme, isSelected: boolean) =>
  StyleSheet.create({
    container: {
      width: 'auto',
      height: 'auto',
      backgroundColor: isSelected ? theme.colors.selectedDate : theme.colors.border,
      borderRadius: 10,
      borderWidth: isSelected ? 1 : 0,
      borderColor: isSelected ? theme.colors.primary : '',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      paddingHorizontal: 16
    }
  });
