import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, ViewStyle } from 'react-native';

import { BodyText, PressableItem } from '../../../../components';
import { useTheme } from '../../../../styles';
import { ICON_SIZE } from '../../../../utils';

export type SpacingControlProps = {
  label: string;
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  unit?: string;
  minValue?: number;
  maxValue?: number;
  containerStyle?: ViewStyle;
  showPercentage?: boolean;
};

export const SpacingControl = ({
  label,
  value,
  onIncrease,
  onDecrease,
  unit = '%',
  minValue = 0,
  maxValue = 100,
  containerStyle,
  showPercentage = true
}: SpacingControlProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;

  const isAtMin = value <= minValue;
  const isAtMax = value >= maxValue;

  return (
    <View
      style={[
        utils.flex_dir_row,
        utils.justify_content_between,
        utils.align_items_center,
        {
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border
        },
        containerStyle
      ]}
    >
      <BodyText>{label}</BodyText>

      <View style={[utils.flex_dir_row, utils.align_items_center, utils.gap_2]}>
        {showPercentage && (
          <BodyText style={{ minWidth: 40, textAlign: 'right' }}>
            {value}
            {unit}
          </BodyText>
        )}

        <View style={[utils.flex_dir_row, utils.gap_1]}>
          <PressableItem onPress={onDecrease} disabled={isAtMin}>
            <MaterialCommunityIcons name="minus" size={ICON_SIZE} color={theme.colors.secondaryText} />
          </PressableItem>
          <PressableItem onPress={onIncrease} disabled={isAtMax}>
            <MaterialCommunityIcons name="plus" size={ICON_SIZE} color={theme.colors.secondaryText} />
          </PressableItem>
        </View>
      </View>
    </View>
  );
};
