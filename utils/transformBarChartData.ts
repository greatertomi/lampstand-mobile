import { BarChartDataProps, TransformedDataProps } from '../types';

export const transformBarChatData = (data: BarChartDataProps[]): TransformedDataProps[] => {
  return data.map(({ label, secondsRead }) => ({
    label,
    value: Math.floor(secondsRead / 60)
  }));
};
