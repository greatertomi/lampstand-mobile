import React, { ReactNode, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { PressableItem } from '../../../components';
import { Theme, useTheme, utilities } from '../../../styles';

import { ReaderFooter } from './ReaderFooter';
import { ReaderHeader } from './ReaderHeader';

type ReadingWrapperProps = {
  children: ReactNode;
  bookTitle: string;
  bookId: string;
  isFullScreen: boolean;
};

export const ReaderWrapper = ({ children, bookTitle, bookId, isFullScreen }: ReadingWrapperProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <View style={styles.container}>
      {!isFullScreen && (
        <View style={{ zIndex: 10 }}>
          <ReaderHeader bookTitle={bookTitle} bookId={bookId} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </View>
      )}
      <View style={utilities.flex}>{children}</View>
      {!isFullScreen && <ReaderFooter />}

      {isMenuOpen && <PressableItem style={styles.overlay} onPress={() => setIsMenuOpen(false)} />}
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
