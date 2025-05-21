import React, { ReactNode, useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';

import { Theme, useTheme, utilities } from '../../../styles';

import { ReaderFooter } from './ReaderFooter';
import { ReaderHeader } from './ReaderHeader';

type ReadingWrapperProps = {
  children: ReactNode;
  bookTitle: string;
  bookId: string;
};

export const ReaderWrapper = ({ children, bookTitle, bookId }: ReadingWrapperProps) => {
  const { theme } = useTheme();
  const isFocusedState = false;
  const styles = createStyleSheet(theme);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <View style={styles.container}>
      {!isFocusedState && (
        <View style={{ zIndex: 10 }}>
          <ReaderHeader bookTitle={bookTitle} bookId={bookId} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </View>
      )}
      <View style={utilities.flex}>{children}</View>
      {!isFocusedState && <ReaderFooter />}

      {isMenuOpen && <Pressable style={styles.overlay} onPress={() => setIsMenuOpen(false)} />}
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      position: 'relative'
    },
    overlay: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });
