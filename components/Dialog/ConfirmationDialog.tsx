import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';

import { Theme, useTheme } from '../../styles';
import { PrimaryButton, SecondaryButton } from '../Button';
import { PressableItem } from '../Pressable';
import { BodyText, HeadingMedium } from '../Typography';

interface ConfirmationModalProps {
  onClose: () => void;
  onOkay: () => void;
  okayButtonText?: string;
  description?: string;
  title: string;
  isVisible?: boolean;
}

export const ConfirmationDialog = ({
  isVisible,
  title,
  okayButtonText = 'Okay',
  onClose,
  onOkay,
  description
}: ConfirmationModalProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const utils = theme.utilities;

  return (
    <Modal visible={isVisible} animationType="fade" transparent>
      <PressableItem style={styles.overlay} onPress={onClose}>
        <View style={[styles.modalContainer, utils.gap_3]}>
          <View style={utils.gap_2}>
            <HeadingMedium bold style={utils.text_left}>
              {title}
            </HeadingMedium>
            <BodyText variant="secondary" style={utils.text_left}>
              {description}
            </BodyText>
          </View>
          <View>
            <View style={[utils.flex_dir_row, utils.gap_1]}>
              <SecondaryButton title="Cancel" onPress={onClose} style={utils.width_50} />
              <PrimaryButton
                variant="danger"
                title={okayButtonText}
                onPress={() => {
                  onOkay();
                  onClose();
                }}
                style={utils.width_50}
              />
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
