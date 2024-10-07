import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TagText } from '../../components';
import { Theme, useTheme, utilities } from '../../styles';
import { formatTime } from '../../utils/formatTime';

export const TimerDescription = ({ goalInMinutes }: { goalInMinutes: number }) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <View style={[utilities.align_items_center]}>
      <Text style={styles.time}>{formatTime(Number(goalInMinutes))}</Text>
      <View style={styles.innerContainer}>
        <TagText variant="secondary">of your {goalInMinutes} - minute goal</TagText>
        <AntDesign name="right" size={10} color={theme.colors.secondaryText} />
      </View>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    innerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    time: {
      color: theme.colors.text,
      fontSize: 36,
      fontWeight: 'bold'
    }
  });
