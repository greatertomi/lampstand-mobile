export const calculateSecondsBetweenDates = (startTime: Date, endTime: Date): number => {
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();
  return Math.max(0, (end - start) / 1000);
};
