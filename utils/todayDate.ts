export const todayDate = (dateData?: string | number): string => {
  const date = dateData ? new Date(dateData) : new Date();
  const day = date.getDate();
  const suffix = getDaySuffix(day);

  const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const year = date.getFullYear();

  return `${weekday} ${day}${suffix} ${month} ${year}`;
};

const getDaySuffix = (day: number): string => {
  if (day >= 11 && day <= 13) return 'th';
  switch (day % 10) {
    case 1: {
      return 'st';
    }
    case 2: {
      return 'nd';
    }
    case 3: {
      return 'rd';
    }
    default: {
      return 'th';
    }
  }
};
