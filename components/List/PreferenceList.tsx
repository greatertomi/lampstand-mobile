import React, { ReactNode } from 'react';
import { View, StyleSheet, TextStyle } from 'react-native';

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
  isPressable?: boolean;
  titleStyle?: TextStyle;
}

export const PreferenceList = ({
  leftIcon,
  hasLeftIcon,
  title,
  hasUnderline,
  rightElement,
  isPressable,
  variant,
  onPress,
  titleStyle
}: PreferenceListProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme, hasUnderline);
  const Container = isPressable ? PressableItem : View;

  return (
    <Container style={styles.container} {...(isPressable ? { onPress } : {})}>
      <View style={[utils.flex_dir_row, utils.align_items_center, utils.gap_2]}>
        {hasLeftIcon && <View>{leftIcon}</View>}
        <BodyText variant={variant} style={[titleStyle]} bold>
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
