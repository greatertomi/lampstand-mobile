import React, { ReactNode } from 'react';
import { Modal, StyleSheet, View } from 'react-native';

import { Theme, useTheme } from '../../styles';
import { PressableItem } from '../Pressable';
import { BodyText } from '../Typography';

interface DialogProp {
  onClose: () => void;
  children: ReactNode;
  isOverlay?: boolean;
  isVisible: boolean;
  useCancelButton?: boolean;
  padding?: number;
}

export const Dialog = ({
  children,
  onClose,
  isOverlay = false,
  isVisible,
  useCancelButton = false,
  padding = 16
}: DialogProp) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme, padding);

  return (
    <Modal animationType="fade" transparent visible={isVisible}>
      {isOverlay && <PressableItem style={styles.overlay} onPress={onClose} />}
      <View style={styles.modalContent}>
        <PressableItem onPress={onClose}>
          <View style={styles.line} />
        </PressableItem>
        <View style={utils.flex}>{children}</View>
        {useCancelButton && (
          <PressableItem onPress={onClose} style={[utils.align_items_center]}>
            <BodyText>Cancel</BodyText>
          </PressableItem>
        )}
      </View>
    </Modal>
  );
};

const createStyleSheet = (theme: Theme, padding: number) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: theme.colors.overlayBackground
    },
    modalContent: {
      width: '100%',
      position: 'absolute',
      bottom: 0,
      backgroundColor: theme.colors.background,
      paddingHorizontal: padding,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
      paddingBottom: 8,
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
