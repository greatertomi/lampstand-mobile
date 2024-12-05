import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

import { Theme, useTheme } from '../../../styles';

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
  const styles = createStyleSheet(theme, isFocusedState);

  return (
    <View style={styles.container}>
      {!isFocusedState && <ReaderHeader bookTitle={bookTitle} isFocusedState={isFocusedState} />}
      {children}
      {!isFocusedState && <ReaderFooter pageNumber={pageNumber} totalPageNumber={totalPageNumber} />}
    </View>
  );
};

const createStyleSheet = (theme: Theme, isFocusedState: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: isFocusedState ? 0 : 56,
      backgroundColor: theme.colors.background,
      position: 'relative'
    }
  });
