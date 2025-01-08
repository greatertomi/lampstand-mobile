import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';

import { deleteBook } from '../../store';
import { Theme, useTheme } from '../../styles';
import { PrimaryButton, SecondaryButton } from '../Button';
import { PressableItem } from '../Pressable';
import { BodyText, HeadingMedium } from '../Typography';

interface DeleteBookProps {
  onClose: () => void;
  closeBookOption: () => void;
  title?: string;
  author?: string;
}

export const DeleteBookModal = ({ onClose, title, author, closeBookOption }: DeleteBookProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const utils = theme.utilities;

  const handleDeleting = async () => {
    await deleteBook(title, author);
    closeBookOption();
    onClose();
  };

  return (
    <Modal animationType="fade" transparent>
      <PressableItem style={styles.overlay} onPress={onClose}>
        <View style={[styles.modalContainer, utils.gap_3]}>
          <View style={[utils.align_self_center, utils.gap_2]}>
            <HeadingMedium bold style={utils.text_left}>
              Remove from library
            </HeadingMedium>
            <BodyText variant="secondary" style={utils.text_left}>
              Do you really want to delete this book? This action cannot be undone.
            </BodyText>
          </View>
          <View>
            <View style={[utils.flex_dir_row, utils.gap_1]}>
              <SecondaryButton title="Cancel" onPress={onClose} style={utils.width_50} />
              <PrimaryButton title="Delete" onPress={handleDeleting} style={utils.width_50} />
            </View>
          </View>
        </View>
      </PressableItem>
    </Modal>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: theme.colors.overlayBackground,
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalContainer: {
      width: 310,
      padding: 20,
      backgroundColor: theme.colors.background,
      borderRadius: 10
    }
  });
