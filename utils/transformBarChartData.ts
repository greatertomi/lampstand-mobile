import { BarChartDataProps, TransformedDataProps } from '../types';

export const transformBarChatData = (data: BarChartDataProps[]): TransformedDataProps[] =>
  data.map(({ label, secondsRead }) => ({
    label,
    value: Math.floor(secondsRead / 60)
  }));
