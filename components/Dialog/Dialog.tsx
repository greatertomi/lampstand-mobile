import React, { ReactNode } from 'react';
import { DimensionValue, Modal, StyleSheet, View } from 'react-native';

import { Theme, useTheme, utilities } from '../../styles';
import { PressableItem } from '../Pressable';

interface DialogProp {
  onClose: () => void;
  modalHeight: DimensionValue | undefined;
  children: ReactNode;
  isOverlay?: boolean;
  isVisible: boolean;
}

export const Dialog = ({ children, onClose, modalHeight, isOverlay = false, isVisible }: DialogProp) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme, modalHeight);

  return (
    <Modal animationType="slide" transparent visible={isVisible}>
      {isOverlay && <PressableItem style={styles.overlay} onPress={onClose} />}
      <View style={styles.modalContent}>
        <PressableItem onPress={onClose}>
          <View style={styles.line} />
        </PressableItem>
        <View style={utilities.flex}>{children}</View>
      </View>
    </Modal>
  );
};

const createStyleSheet = (theme: Theme, modalHeight: DimensionValue | undefined) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: theme.colors.overlayBackground
    },
    modalContent: {
      height: modalHeight,
      width: '100%',
      position: 'absolute',
      bottom: 0,
      backgroundColor: theme.colors.background,
      paddingHorizontal: 16,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
      gap: 16
    },
    line: {
      width: 40,
      height: 5,
      marginTop: 15,
      alignSelf: 'center',
      borderRadius: 10,
      backgroundColor: theme.colors.secondaryText
    }
  });
