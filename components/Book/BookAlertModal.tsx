import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';

import { Theme, useTheme } from '../../styles';
import { PrimaryButton, SecondaryButton } from '../Button';
import { PressableItem } from '../Pressable';
import { BodyText, HeadingMedium } from '../Typography';

interface DeleteBookProps {
  onClose: () => void;
  onOkay: () => void;
  closeBookOption: () => void;
  description?: string;
  title: string;
  buttonTitle: string;
}

export const BookAlertModal = ({
  title,
  buttonTitle,
  onClose,
  onOkay,
  description,
  closeBookOption
}: DeleteBookProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const utils = theme.utilities;

  return (
    <Modal animationType="fade" transparent>
      <PressableItem style={styles.overlay} onPress={onClose}>
        <View style={[styles.modalContainer, utils.gap_3]}>
          <View style={[utils.align_self_center, utils.gap_2]}>
            <HeadingMedium bold style={utils.text_center}>
              {title}
            </HeadingMedium>
            <BodyText variant="secondary" style={utils.text_center}>
              {description}
            </BodyText>
          </View>
          <View>
            <View style={[utils.flex_dir_row, utils.gap_1]}>
              <SecondaryButton title="Cancel" onPress={onClose} style={utils.width_50} />
              <PrimaryButton
                title={buttonTitle}
                onPress={() => {
                  onOkay();
                  closeBookOption();
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
