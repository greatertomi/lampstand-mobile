import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { handSlide, slide } from '../../../../assets';
import { BodyText, PressableItem } from '../../../../components';
import { Theme, useTheme } from '../../../../styles';

export const SwipeActions = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);

  const swipeActions = [
    {
      label: 'Slide',
      svg: slide
    },
    {
      label: 'Scroll',
      svg: handSlide
    }
  ];

  return (
    <View style={styles.container}>
      {swipeActions.map((action, index) => (
        <PressableItem key={index}>
          <View style={[utils.flex_dir_row, utils.align_items_center, utils.justify_content_between, utils.p_1]}>
            <BodyText bold>{action.label}</BodyText>
            <SvgXml xml={action.svg} />
          </View>
          <View style={styles.line} />
        </PressableItem>
      ))}
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      width: 173,
      bottom: '35%',
      right: '10%',
      paddingHorizontal: 14,
      paddingVertical: 16,
      backgroundColor: theme.colors.background,
      borderRadius: 10
    },
    line: {
      height: 1,
      backgroundColor: theme.colors.readerLineColor
    }
  });
