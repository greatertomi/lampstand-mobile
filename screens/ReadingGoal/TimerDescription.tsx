import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useSWR from 'swr';
import { apiService, endpoints } from '../../api';
import { TagText } from '../../components';
import { Theme, useTheme, utilities } from '../../styles';
import { formatTime } from '../../utils/formatTime';

export const TimerDescription = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const { data } = useSWR(endpoints.getReadingGoalTime, async (url) => {
    const res = await apiService.get(url);
    return res.data.data;
  });

  return (
    <View style={[utilities.align_items_center]}>
      <Text style={styles.time}>{formatTime(data?.goalInMinutes ?? 15)}</Text>
      <View style={styles.innerContainer}>
        <TagText style={styles.color}>of your {data?.goalInMinutes ?? 15} - minute goal</TagText>
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
    color: {
      color: theme.colors.secondaryText
    },
    time: {
      color: theme.colors.text,
      fontSize: 36,
      fontWeight: 'bold'
    }
  });
