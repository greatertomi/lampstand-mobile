/* eslint-disable no-restricted-syntax */
import { StyleSheet, View, ScrollView } from 'react-native';

import { BodyTextSmall, BottomSheet, PressableItem } from '../../../../components';
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
    <BottomSheet
      isVisible={visible}
      onClose={onClose}
      snapPoints={['35%']}
      enablePanDownToClose
      containerStyle={styles.bottomSheetContainer}
      contentGestureEnabled={false}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.colorScrollContainer}>
        {highlightColors.map((color) => (
          <PressableItem
            key={color}
            onPress={() => actions.onAddHighlight(color)}
            style={[styles.highlightColor, { backgroundColor: color }]}
          />
        ))}
      </ScrollView>
      <View style={styles.actionsContainer}>
        <PressableItem style={styles.actionButton} onPress={actions.onCopyToClipboard}>
          <BodyTextSmall>Copy</BodyTextSmall>
        </PressableItem>
        <PressableItem style={styles.actionButton} onPress={actions.onShare}>
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
    </BottomSheet>
  );
};

const createStylesheet = (theme: Theme) =>
  StyleSheet.create({
    bottomSheetContainer: {
      paddingHorizontal: 0,
      paddingTop: 0,
      paddingBottom: 25
    },
    colorScrollContainer: {
      gap: 8,
      paddingHorizontal: 24
    },
    actionsContainer: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 16,
      paddingHorizontal: 24,
      width: '100%'
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
