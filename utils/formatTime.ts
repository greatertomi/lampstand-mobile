export const formatTime = (value: number): string => {
  if (value <= 0) {
    return '00:00';
  }

  const minutes = Math.round(value / 60);

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 24) {
    throw new Error('Invalid time: hours must be 24 or less');
  }

  const formattedHours = hours < 10 ? `0${hours}` : hours.toString();
  const formattedMinutes = mins < 10 ? `0${mins}` : mins.toString();

  return `${formattedHours}:${formattedMinutes}`;
};

export const renderGoalTime = (value: number): string => {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;
  if (hours > 0 && minutes === 0) {
    return `${hours} - hour `;
  }
  if (hours > 0) {
    return `${hours}h ${minutes}mins`;
  }
  return `${minutes} - minute`;
};
