/* eslint-disable no-restricted-syntax */
import { Modal, Pressable, StyleSheet, View, ScrollView } from 'react-native';

import { BodyTextSmall, PressableItem } from '../../../../components';
import { Theme, useTheme } from '../../../../styles';

import { SelectionActions } from './types';

interface BottomModalProps {
  onClose: () => void;
  visible: boolean;
  actions: SelectionActions;
  isHighlightSelected: boolean;
}

const highlightColors = [
  '#FF6B6B',
  '#FFD93D',
  '#6BCB77',
  '#4D96FF',
  '#9D4EDD',
  '#FF6F91',
  '#FF9671',
  '#FFC75F',
  '#F9F871',
  '#D0F4DE'
];

export const SelectionModal = ({ onClose, visible, actions, isHighlightSelected }: BottomModalProps) => {
  const { theme } = useTheme();
  const styles = createStylesheet(theme);

  return (
    <Modal transparent animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.container}>
          <PressableItem style={styles.handle} onPress={onClose} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8, paddingHorizontal: 8 }}
          >
            {highlightColors.map((color) => (
              <PressableItem
                key={color}
                onPress={() => actions.onAddHighlight(color)}
                style={[styles.highlightColor, { backgroundColor: color }]}
              />
            ))}
          </ScrollView>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 16 }}>
            <PressableItem style={styles.actionButton} onPress={actions.onCopyToClipboard}>
              <BodyTextSmall>Copy</BodyTextSmall>
            </PressableItem>
            <PressableItem style={styles.actionButton}>
              <BodyTextSmall>Share</BodyTextSmall>
            </PressableItem>
            <PressableItem style={styles.actionButton} onPress={actions.onAddNote}>
              <BodyTextSmall>Comment</BodyTextSmall>
            </PressableItem>
            {isHighlightSelected && (
              <PressableItem style={styles.actionButton} onPress={actions.onRemoveHighlight}>
                <BodyTextSmall variant="error">Remove Highlight</BodyTextSmall>
              </PressableItem>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const createStylesheet = (theme: Theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'flex-end'
    },
    backdrop: {
      flex: 1,
      backgroundColor: theme.colors.overlayBackground
    },
    container: {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingBottom: 34,
      paddingHorizontal: 24,
      paddingTop: 12,
      maxHeight: '80%',
      elevation: 5,
      shadowOffset: {
        width: 0,
        height: -2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84
    },
    handle: {
      width: 40,
      height: 4,
      backgroundColor: theme.colors.border,
      borderRadius: 2,
      alignSelf: 'center',
      marginBottom: 24
    },
    actionButton: {
      backgroundColor: theme.colors.secondaryBackground,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8
    },
    highlightColor: {
      width: 30,
      height: 30,
      margin: 4,
      borderRadius: 15
    }
  });
