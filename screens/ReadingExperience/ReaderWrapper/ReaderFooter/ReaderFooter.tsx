import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BodyTextSmall } from '../../../../components';
import { Theme, useTheme } from '../../../../styles';

type ReaderFooterProps = {
  pageNumber?: string;
  totalPageNumber?: string;
};

export const ReaderFooter = ({ pageNumber, totalPageNumber }: ReaderFooterProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <View style={styles.footer}>
      <BodyTextSmall style={styles.page}>
        {pageNumber} / {totalPageNumber}
      </BodyTextSmall>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    footer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      backgroundColor: theme.colors.background
    },
    page: {
      color: theme.colors.readerIconColor
    }
  });
