import React, { ReactNode, useState } from 'react';
import { View, StyleSheet } from 'react-native';

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
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <View style={styles.container}>
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
      left: 0,
      backgroundColor: theme.colors.overlayBackground,
      zIndex: 5
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
