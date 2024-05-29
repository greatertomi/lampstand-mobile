import React from 'react';
import { View } from 'react-native';
import { Streaks } from './Streaks';
import { SetNewGoal } from './SetNewGoal';

export const ReadingGoals = () => (
  <View>
    <Streaks />
    <SetNewGoal />
  </View>
);
