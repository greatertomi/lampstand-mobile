import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { BodyText, BodyTextSmall } from '../../../../components';
import { Separator } from '../../../../components/Separator';
import { useTheme } from '../../../../styles';

interface SpacingControlProps {
  label: string;
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
}

export const SpacingControl = ({ label, value, onIncrease, onDecrease, min = 0, max = 100 }: SpacingControlProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;

  return (
    <View style={[utils.flex_dir_row, utils.justify_content_between, utils.align_items_center, utils.py_2]}>
      <BodyText style={[utils.flex]}>{label}</BodyText>
      <View style={[utils.flex_dir_row, utils.align_items_center, utils.gap_1]}>
        <BodyTextSmall style={[{ color: theme.colors.text }, utils.text_center]}>{value}%</BodyTextSmall>
        <View style={[utils.flex_dir_row, { backgroundColor: theme.colors.inactiveButtonColor, borderRadius: 4 }]}>
          <TouchableOpacity onPress={onDecrease} style={[styles.spacingButton]} disabled={value <= min}>
            <AntDesign name="minus" size={18} color={value <= min ? theme.colors.neutralGrey : theme.colors.text} />
          </TouchableOpacity>
          <Separator direction="vertical" margin={4} />
          <TouchableOpacity onPress={onIncrease} style={[styles.spacingButton]} disabled={value >= max}>
            <AntDesign name="plus" size={18} color={value >= max ? theme.colors.neutralGrey : theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = {
  spacingButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    justifyContent: 'center' as const,
    alignItems: 'center' as const
  }
};
