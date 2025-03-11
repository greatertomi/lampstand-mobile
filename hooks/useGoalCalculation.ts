import { useMemo } from 'react';

import { ReadingLog } from '../types';

const filterReadingLogsByToday = (readingLogs: ReadingLog[] = []) => {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  return readingLogs.filter((log) => {
    const logDate = new Date(log.startTime).toISOString().split('T')[0];
    return logDate === todayStr;
  });
};

export const useGoalCalculation = (readingGoal: number, readingLogs?: ReadingLog[]) => useMemo(() => {
    const todayReadLogs = filterReadingLogsByToday(readingLogs);
    const totalReadTime = todayReadLogs.reduce((sum, log) => sum + log.secondsRead, 0);
    const goalInSeconds = readingGoal * 60;
    const progress = goalInSeconds > 0 ? (totalReadTime / goalInSeconds) * 100 : 0;

    return { progress, totalReadTime };
  }, [readingGoal, readingLogs]);
