import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, View } from 'react-native';
import { BarChart as Chart } from 'react-native-gifted-charts';

import { Theme, useTheme } from '../../styles';
import { BarChartDataProps, BarChartProps, BarChartType } from '../../types';
import { groupDayChartData } from '../../utils';
import { BodyTextLarge, TagText } from '../Typography';

export const BarChart = ({
  barData,
  title,
  type,
  width = Dimensions.get('window').width - 100,
  isAnimated = true,
  maxValue = 0
}: BarChartProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme, type);
  const groupedData = groupDayChartData(barData, type);

  const updatedBarData = groupedData.map((item, index, arr) => {
    if (type === 'week') {
      return { ...item, ...styles.barStyles };
    }

    const isNextHavingLabel = arr[index + 1]?.label !== undefined;
    return isNextHavingLabel ? item : { ...item, ...styles.barStyles };
  });

  return (
    <>
      <View style={[utils.flex_dir_row, utils.justify_content_between, utils.align_items_center, utils.pb_3]}>
        <MaterialIcons name="keyboard-arrow-left" size={36} color={theme.colors.secondaryText} />
        <BodyTextLarge bold>{title}</BodyTextLarge>
        <MaterialIcons name="keyboard-arrow-right" size={36} color={theme.colors.secondaryText} />
      </View>
      <Chart
        data={updatedBarData}
        isAnimated={isAnimated}
        animationDuration={800}
        height={250}
        width={width}
        yAxisSide={1}
        yAxisLabelWidth={60}
        backgroundColor={theme.colors.background}
        spacing={24}
        barWidth={12}
        barBorderTopLeftRadius={20}
        barBorderTopRightRadius={20}
        xAxisThickness={1}
        yAxisThickness={1}
        yAxisOffset={0}
        adjustToWidth
        maxValue={maxValue}
        xAxisLabelTextStyle={{ color: theme.colors.secondaryText }}
        yAxisTextStyle={{ color: theme.colors.secondaryText }}
        highlightEnabled
        renderTooltip={(value: BarChartDataProps) => <TagText variant="default">{`${value.value} mins read`}</TagText>}
        stepValue={maxValue / 5}
        xAxisColor={theme.colors.border}
        yAxisColor={theme.colors.border}
        yAxisIndicesColor={theme.colors.border}
        xAxisIndicesColor={theme.colors.border}
        yAxisLabelSuffix=" mins"
        dashGap={0}
        showVerticalLines
        verticalLinesSpacing={maxValue}
        frontColor={theme.colors.primary}
      />
    </>
  );
};

const createStyleSheet = (theme: Theme, type: BarChartType) => ({
  barStyles: {
    spacing: type === 'day' ? 1 : 34,
    labelWidth: type === 'day' ? 80 : 10,
    labelTextStyle:
      type === 'week'
        ? { color: theme.colors.secondaryText, textAlign: 'center' }
        : { color: theme.colors.secondaryText, textAlign: 'left' }
  }
});
