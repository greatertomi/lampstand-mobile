import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

import { Theme, useTheme } from '../../styles';
import { BodyText, PressableItem } from '../index';

interface PreferenceListProps {
  leftIcon?: ReactNode;
  title?: string;
  variant?: 'primary' | 'secondary';
  rightElement?: ReactNode;
  onPress?: () => void;
  hasUnderline?: boolean;
  hasLeftIcon?: boolean;
  isPressable?: boolean;
}

export const PreferenceList = ({
  leftIcon,
  hasLeftIcon,
  title,
  hasUnderline,
  rightElement,
  isPressable,
  variant,
  onPress
}: PreferenceListProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme, hasUnderline);
  const Container = isPressable ? PressableItem : View;

  return (
    <Container style={styles.container} {...(isPressable ? { onPress } : {})}>
      <View style={[utils.flex_dir_row, utils.align_items_center, utils.gap_2]}>
        {hasLeftIcon && <View>{leftIcon}</View>}
        <BodyText variant={variant} bold>
          {title}
        </BodyText>
      </View>
      <View>{rightElement}</View>
    </Container>
  );
};

const createStyleSheet = (theme: Theme, hasUnderline?: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: hasUnderline ? 1 : undefined,
      borderBottomColor: theme.colors.readerLineColor
    }
  });
