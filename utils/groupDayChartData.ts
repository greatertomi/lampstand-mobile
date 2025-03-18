import { BarChartDataProps } from '../types';

export const groupDayChartData = (data: BarChartDataProps[], type: string): BarChartDataProps[] => {
  if (type !== 'day') return data;
  const labelHours = new Set(['12am', '6am', '12pm', '6pm']);

  const filteredData = data.filter((item) => item.value !== 0 || labelHours.has(item.label));

  return filteredData.map((item) => {
    if (!labelHours.has(item.label)) {
      return { value: item.value } as BarChartDataProps;
    }

    return item;
  });
};
