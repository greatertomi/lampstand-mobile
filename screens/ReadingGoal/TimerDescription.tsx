import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { TagText } from '../../components';
import { fontFamily, Theme, useTheme, utilities } from '../../styles';
import { formatTime, renderGoalTime } from '../../utils/formatTime';

type TimerDescriptionProps = Record<'goalInMinutes' | 'calculatedReadTime', number>;

export const TimerDescription = ({ goalInMinutes, calculatedReadTime }: TimerDescriptionProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <View style={[utilities.align_items_center]}>
      <Text style={styles.time}>{formatTime(Number(calculatedReadTime))}</Text>
      <View style={styles.innerContainer}>
        <TagText variant="secondary">of your {renderGoalTime(Number(goalInMinutes))} goal</TagText>
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
      fontFamily: fontFamily.plusJakartaSansBold
    }
  });
