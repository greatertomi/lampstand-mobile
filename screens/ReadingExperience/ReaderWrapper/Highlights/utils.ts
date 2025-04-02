export const formatTimestamp = (timestamp: number) => {
  const date = new Date(Number(timestamp));
  return date.toLocaleString('en-US', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};
