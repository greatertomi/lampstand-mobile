export const formatTime = (value: number): string => {
  if (value <= 0) {
    return '00:00';
  }

  const hours = Math.floor(value / 60);
  const mins = value % 60;
  if (hours > 24) {
    throw new Error('Invalid time: hours must be 24 or less');
  }
  const formattedHours = hours < 10 ? `0${hours}` : hours.toString();
  const formattedMinutes = mins < 10 ? `0${mins}` : mins.toString();

  return `${formattedHours}:${formattedMinutes}`;
};
