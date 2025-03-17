import { useTheme } from '../../styles';

import { BarDataProps } from './BarChart';

export const useDummyData = () => {
  const { theme } = useTheme();
  const frontColor = theme.colors.primary;
  const spacing = 1;
  const labelWidth = 80;
  const labelTextStyle = { color: theme.colors.secondaryText, textAlign: 'left' };

  const dayData: BarDataProps[] = [
    {
      value: 40,
      label: '6pm',
      spacing,
      labelWidth,
      labelTextStyle,
      frontColor
    },
    { value: 50, spacing, frontColor },
    { value: 50, spacing, frontColor },
    { value: 70, frontColor },
    {
      value: 30,
      label: '8am',
      spacing,
      labelWidth,
      labelTextStyle,
      frontColor
    },
    { value: 10, frontColor },
    {
      value: 55,
      label: '7am',
      spacing,
      labelWidth,
      labelTextStyle,
      frontColor
    },
    { value: 25, spacing, frontColor },
    { value: 25, spacing, frontColor },
    { value: 25, frontColor },
    {
      value: 30,
      label: '4pm',
      spacing,
      labelWidth,
      labelTextStyle,
      frontColor
    },
    { value: 12, spacing, frontColor },
    { value: 43, spacing, frontColor },
    { value: 23, spacing, frontColor },
    { value: 52, spacing, frontColor },
    { value: 11, frontColor },
    {
      value: 60,
      label: '5pm',
      spacing,
      labelWidth,
      labelTextStyle,
      frontColor
    },
    { value: 40, frontColor },
    {
      value: 65,
      label: '7pm',
      spacing,
      labelWidth,
      labelTextStyle,
      frontColor
    },
    { value: 30, spacing, frontColor },
    { value: 30, frontColor }
  ];

  const weekData: BarDataProps[] = [
    {
      value: 5,
      label: 'Sun',
      spacing: 30,
      labelWidth,
      labelTextStyle,
      frontColor
    },
    {
      value: 25,
      label: 'Mon',
      spacing: 30,
      labelWidth,
      labelTextStyle,
      frontColor
    },
    {
      value: 41,
      label: 'Tue',
      spacing: 30,
      labelWidth,
      labelTextStyle,
      frontColor
    },
    {
      value: 22,
      label: 'Wed',
      spacing: 30,
      labelWidth,
      labelTextStyle,
      frontColor
    },
    {
      value: 70,
      label: 'Thur',
      spacing: 40,
      labelWidth,
      labelTextStyle,
      frontColor
    },
    {
      value: 66,
      label: 'Fri',
      spacing: 40,
      labelWidth,
      labelTextStyle,
      frontColor
    },
    {
      value: 35,
      label: 'Sat',
      labelWidth,
      labelTextStyle,
      frontColor
    }
  ];

  return { dayData, weekData };
};
