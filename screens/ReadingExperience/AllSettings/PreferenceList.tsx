import React, { ReactNode } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';

import { BodyText } from '../../../components';
import { Theme, useTheme } from '../../../styles';

interface PreferenceListProps {
  leftICon?: ReactNode;
  title?: string;
  rightElement?: ReactNode;
  onPress?: () => void;
  useUnderline?: boolean;
  useLeftIcon?: boolean;
  isPressable?: boolean;
}

export const PreferenceList = ({
  leftICon,
  useLeftIcon,
  title,
  useUnderline,
  rightElement,
  isPressable,
  onPress
}: PreferenceListProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme, useUnderline);

  return (
    <Pressable
      style={({ pressed }) => [isPressable && pressed && { opacity: 0.5 }, styles.container]}
      onPress={onPress}
    >
      <View style={[utils.flex_dir_row, utils.align_items_center, utils.gap_2]}>
        {useLeftIcon && <View>{leftICon}</View>}
        <BodyText bold>{title}</BodyText>
      </View>
      <View>
        <View>{rightElement}</View>
      </View>
    </Pressable>
  );
};

const createStyleSheet = (theme: Theme, useUnderline?: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: useUnderline ? 1 : undefined,
      borderBottomColor: theme.colors.readerLineColor
    }
  });
