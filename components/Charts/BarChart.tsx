import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Dimensions, View } from 'react-native';
import { BarChart as Chart } from 'react-native-gifted-charts';
import { SvgXml } from 'react-native-svg';

import { emptyChart } from '../../assets';
import { Theme, useTheme } from '../../styles';
import { BarChartProps, ChartType, TransformedDataProps } from '../../types';
import { groupDayChartData } from '../../utils';
import { SkeletonComponent } from '../Skeleton';
import { BodyText, BodyTextLarge, TagText } from '../Typography';

export const BarChart = ({
  barData,
  title,
  type,
  width = Dimensions.get('window').width - 115,
  isAnimated = true,
  isLoading = false,
  maxValue = 0,
  onRightPress,
  onLeftPress
}: BarChartProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme, type);
  const groupedData = groupDayChartData(barData, type);
  const isDataEmpty = barData.every((item) => item.value === 0);
  const maximumValue = Math.max(...barData.map((item) => item.value), maxValue);

  if (isLoading) {
    return <SkeletonComponent width={340} height={211} />;
  }

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
        <MaterialIcons name="keyboard-arrow-left" size={36} color={theme.colors.secondaryText} onPress={onLeftPress} />
        <BodyTextLarge bold>{title}</BodyTextLarge>
        <MaterialIcons
          name="keyboard-arrow-right"
          size={36}
          color={theme.colors.secondaryText}
          onPress={onRightPress}
        />
      </View>
      <View style={{ position: 'relative' }}>
        <Chart
          data={barData.length > 0 ? updatedBarData : [{ value: 0, label: '' }]}
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
          maxValue={maximumValue}
          xAxisLabelTextStyle={{ color: theme.colors.secondaryText }}
          yAxisTextStyle={{ color: theme.colors.secondaryText }}
          highlightEnabled
          renderTooltip={(value: TransformedDataProps) => (
            <TagText variant="default">{`${value.value} mins read`}</TagText>
          )}
          stepValue={maximumValue / 5}
          xAxisColor={theme.colors.border}
          yAxisColor={theme.colors.border}
          yAxisIndicesColor={theme.colors.border}
          xAxisIndicesColor={theme.colors.border}
          yAxisLabelSuffix=" mins"
          dashGap={0}
          showVerticalLines
          verticalLinesColor={theme.colors.border}
          verticalLinesSpacing={70}
          frontColor={theme.colors.primary}
          rulesColor={theme.colors.border}
        />

        {isDataEmpty && (
          <View
            style={{
              position: 'absolute',
              top: '60%',
              left: '30%',
              transform: [{ translateX: -50 }, { translateY: -50 }],
              alignItems: 'center'
            }}
          >
            <SvgXml xml={emptyChart} />
            <BodyText style={{ color: theme.colors.secondaryText, marginTop: 4 }}>No data for this report yet</BodyText>
          </View>
        )}
      </View>
    </>
  );
};

const createStyleSheet = (theme: Theme, type: ChartType) => ({
  barStyles: {
    spacing: type === 'day' ? 1 : 34,
    labelWidth: type === 'day' ? 80 : 10,
    labelTextStyle:
      type === 'week'
        ? { color: theme.colors.secondaryText, textAlign: 'center' }
        : { color: theme.colors.secondaryText, textAlign: 'left' }
  }
});
