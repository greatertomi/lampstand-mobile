import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BodyTextSmall } from '../../../components';
import { useReader } from '../../../package/epub-reader';
import { Theme, useTheme } from '../../../styles';

export const ReaderFooter = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const { currentLocation, totalLocations: totalPageNumber } = useReader();
  const currentPageNumber = Math.max(currentLocation?.start.location ?? 1, 1);

  return (
    <View style={styles.footer}>
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
      backgroundColor: theme.colors.cardBorderColor
    },
    page: {
      color: theme.colors.readerIconColor
    }
  });
