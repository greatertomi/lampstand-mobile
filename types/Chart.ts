export type BarChartDataProps = {
  value: number;
  label: string;
};

export type BarChartType = 'day' | 'week';

export type BarChartProps = {
  barData: BarChartDataProps[];
  title: string;
  type: BarChartType;
  maxValue?: number;
  width?: number;
  isAnimated?: boolean;
};
