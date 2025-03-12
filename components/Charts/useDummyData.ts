import { useTheme } from '../../styles';

export const useDummyData = () => {
  const { theme } = useTheme();
  const frontColor = theme.colors.primary;
  const spacing = 1;
  const labelWidth = 80;
  const labelTextStyle = { color: theme.colors.secondaryText, textAlign: 'left' };

  const dayData = [
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

  return { dayData };
};
