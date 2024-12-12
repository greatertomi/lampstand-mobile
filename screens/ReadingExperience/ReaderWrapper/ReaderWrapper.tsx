import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

import { Theme, useTheme, utilities } from '../../../styles';

import { ReaderFooter } from './ReaderFooter/ReaderFooter';
import { ReaderHeader } from './ReaderHeader';

type ReadingWrapperProps = {
  children: ReactNode;
  bookTitle: string;
  pageNumber?: string;
  totalPageNumber?: string;
};

export const ReaderWrapper = ({ children, bookTitle, pageNumber, totalPageNumber }: ReadingWrapperProps) => {
  const { theme } = useTheme();
  const isFocusedState = false;
  const styles = createStyleSheet(theme);

  return (
    <View style={styles.container}>
      {!isFocusedState && (
        <View style={{ zIndex: 10 }}>
          <ReaderHeader bookTitle={bookTitle} />
        </View>
      )}
      <View style={utilities.flex}>{children}</View>
      {!isFocusedState && <ReaderFooter pageNumber={pageNumber} totalPageNumber={totalPageNumber} />}
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background
    }
  });
