// TODO: Add a unit test for this function
export const formatTime = (value: number): string => {
  const hours = Math.floor(value / 60);
  const mins = value % 60;

  const formattedHours = hours < 10 ? `0${hours}` : hours.toString();
  const formattedMinutes = mins < 10 ? `0${mins}` : mins.toString();

  return `${formattedHours}:${formattedMinutes}`;
};
