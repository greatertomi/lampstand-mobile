import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

import { Theme, useTheme } from '../../styles';
import { PressableItem } from '../Pressable';
import { BodyText } from '../Typography';

interface PreferenceListProps {
  leftIcon?: ReactNode;
  title?: string;
  variant?: 'primary' | 'secondary';
  rightElement?: ReactNode;
  onPress?: () => void;
  hasUnderline?: boolean;
  hasLeftIcon?: boolean;
  isDisabled?: boolean;
}

export const PreferenceList = ({
  leftIcon,
  hasLeftIcon,
  title,
  hasUnderline,
  rightElement,
  variant,
  onPress,
  isDisabled = false
}: PreferenceListProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme, hasUnderline);

  const Container = isDisabled ? View : PressableItem;

  return (
    <Container style={styles.container} {...(isDisabled ? {} : { onPress })}>
      <View style={[utils.flex_dir_row, utils.align_items_center, utils.gap_2]}>
        {hasLeftIcon && <View>{leftIcon}</View>}
        <BodyText variant={variant} style={[isDisabled && styles.disabledTitle]} bold>
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
    },
    disabledTitle: {
      color: theme.colors.inactiveButtonColor
    }
  });
