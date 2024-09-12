import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TagText } from '../../components';
import { Theme, useTheme } from '../../styles';

type StreakDaysProps = {
  day: string;
  completed: boolean;
};

export const StreakDays = ({ day, completed }: StreakDaysProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme, completed);

  return (
    <View style={styles.container}>
      <TagText style={styles.day}>{day}</TagText>
    </View>
  );
};

const createStyleSheet = (theme: Theme, completed: boolean) =>
  StyleSheet.create({
    container: {
      width: 26,
      height: 26,
      borderRadius: 50,
      borderWidth: completed ? 0 : 1,
      justifyContent: 'center',
      backgroundColor: completed ? theme.colors.primary : theme.colors.background
    },
    day: {
      textAlign: 'center',
      color: completed ? theme.colors.background : theme.colors.text
    }
  });
