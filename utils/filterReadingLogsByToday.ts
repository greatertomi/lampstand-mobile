import { ReadingLog } from '../types';

export const filterReadingLogsByToday = (readingLogs: ReadingLog[] = []) => {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  return readingLogs.filter((log) => {
    const logDate = new Date(log.startTime).toISOString().split('T')[0];
    return logDate === todayStr;
  });
};
