import { StatusBar } from 'expo-status-bar';
import React, { ReactNode, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets, EdgeInsets } from 'react-native-safe-area-context';

import { PressableItem } from '../../../components';
import { Theme, useTheme, utilities } from '../../../styles';

import { ReaderFooter } from './ReaderFooter';
import { ReaderHeader } from './ReaderHeader';
import { SelectionActions, SelectionModal } from './SelectionModal';

type ReadingWrapperProps = {
  children: ReactNode;
  bookTitle: string;
  bookId: string;
  isFocusedState?: boolean;
  isSelectionModalOpen: boolean;
  closeSelectionModal: () => void;
  actions: SelectionActions;
  isHighlightSelected: boolean;
};

export const ReaderWrapper = ({
  children,
  bookTitle,
  bookId,
  isFocusedState = false,
  isSelectionModalOpen,
  closeSelectionModal,
  actions,
  isHighlightSelected
}: ReadingWrapperProps) => {
  const { theme, mode } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyleSheet(theme, insets);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar hidden={Platform.OS === 'android' && isFocusedState} style={mode === 'dark' ? 'light' : 'dark'} />

      {/* Status bar background for edge-to-edge mode */}
      {!isFocusedState && <View style={styles.statusBarBackground} />}

      <View style={utilities.flex}>{children}</View>

      {!isFocusedState && (
        <>
          <View style={styles.header}>
            <ReaderHeader bookTitle={bookTitle} bookId={bookId} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          </View>
          <View style={styles.footer}>
            <ReaderFooter />
          </View>
        </>
      )}

      {isMenuOpen && <PressableItem style={styles.overlay} onPress={() => setIsMenuOpen(false)} />}
      <SelectionModal
        onClose={closeSelectionModal}
        visible={isSelectionModalOpen}
        actions={actions}
        isHighlightSelected={isHighlightSelected}
      />
    </View>
  );
};

const createStyleSheet = (theme: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      position: 'relative'
    },
    statusBarBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: insets.top,
      backgroundColor: theme.colors.background,
      zIndex: 1
    },
    overlay: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: theme.colors.overlayBackground
    },
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10
    }
  });
