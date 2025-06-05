export const dateFormats = (dateData?: string | number): string => {
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

export const weekRange = (dateStr: string) => {
  const date = new Date(dateStr);
  const day = date.getDay();

  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - day);

  const endOfWeek = new Date(date);
  endOfWeek.setDate(date.getDate() + (6 - day));

  const formatDate = (d: Date): string => {
    const dayOfMonth = d.getDate();
    const month = d.toLocaleString('default', { month: 'long' });
    const year = d.getFullYear();

    return `${dayOfMonth}${getDaySuffix(dayOfMonth)} ${month} ${year}`;
  };

  return `${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`;
};
