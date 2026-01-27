import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BodyTextSmall } from '../../../components';
import { useReader } from '../../../packages/epub-reader';
import { Theme, useTheme } from '../../../styles';

import { getPresetDetails } from './utils';

export const ReaderFooter = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const { currentLocation, totalLocations: totalPageNumber, preset } = useReader();
  const currentPageNumber = Math.max(currentLocation?.start.location ?? 1, 1);
  const { presetStyles } = getPresetDetails(preset, theme);

  return (
    <View style={[styles.footer, { backgroundColor: presetStyles.backgroundColor }]}>
      {totalPageNumber > 0 && (
        <BodyTextSmall style={[styles.page, { color: presetStyles.textColor }]}>
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
      paddingHorizontal: 15
    },
    page: {
      color: theme.colors.readerIconColor
    }
  });
