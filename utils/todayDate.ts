export const todayDate = (dateData?: string) => {
  const date = dateData ? new Date(dateData) : new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  const day = date.getDate();
  const suffix = getDaySuffix(day);

  return formattedDate.replace(/\d+/, `${day}${suffix}`);
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
