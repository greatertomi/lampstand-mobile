import { ReactNode } from 'react';

export type BarChartDataProps = {
  secondsRead: number;
  label: string;
  date?: string;
};

export interface TransformedDataProps extends Omit<BarChartDataProps, 'secondsRead'> {
  value: number;
}

export enum ChartType {
  DAY = 'day',
  WEEK = 'week'
}

export type BarChartProps = {
  barData: TransformedDataProps[];
  title?: ReactNode;
  type: ChartType;
  maxValue?: number;
  width?: number;
  isAnimated?: boolean;
  isLoading?: boolean;
  onLeftPress?: () => void;
  onRightPress?: () => void;
};
