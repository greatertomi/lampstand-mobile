import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BodyTextSmall } from '../../../components';
import { useReader } from '../../../package/epub-reader';
import { Theme, useTheme } from '../../../styles';

import { READING_PRESET } from './types';

export const ReaderFooter = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const { currentLocation, totalLocations: totalPageNumber, currentPreset } = useReader();
  const currentPageNumber = Math.max(currentLocation?.start.location ?? 1, 1);

  const backgroundColor = (() => {
    switch (currentPreset) {
      case READING_PRESET.PAPER: {
        return theme.colors.presetPaperFooter;
      }
      case READING_PRESET.BOLD: {
        return theme.colors.inactiveButtonColor;
      }
      default: {
        return theme.colors.border;
      }
    }
  })();

  return (
    <View style={[styles.footer, { backgroundColor }]}>
      {totalPageNumber > 0 && (
        <BodyTextSmall style={styles.page}>
          {currentPageNumber} / {totalPageNumber}
        </BodyTextSmall>
      )}
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    footer: {
      position: 'absolute',
      bottom: 20,
      alignSelf: 'center',
      borderRadius: 20,
      paddingVertical: 3,
      paddingHorizontal: 15,
    },
    page: {
      color: theme.colors.readerIconColor
    }
  });
