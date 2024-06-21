import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { TagText } from '../../../components';
import { Theme, useTheme, utilities } from '../../../styles';

interface ProgressTimeProps {
  goalTime: number;
}

export const TimerDescription = ({ goalTime }: ProgressTimeProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  return (
    <View style={[utilities.align_items_center]}>
      <Text style={styles.time}>05:00</Text>
      <View style={styles.innerContainer}>
        <TagText style={styles.color}>of your {goalTime}- minute goal</TagText>
        <AntDesign name="right" size={10} color={theme.colors.secondaryText} />
      </View>
    </View>
  );
};

const createStyleSheet = (theme: Theme) => StyleSheet.create({
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  color: {
    color: theme.colors.secondaryText
  },
  time: {
    color: theme.colors.text,
    fontSize: 36,
    fontWeight: 'bold'
  }
});
