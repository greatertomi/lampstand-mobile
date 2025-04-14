import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Modal,
  NativeSyntheticEvent,
  NativeTouchEvent,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native';

import { BodyText, PressableItem, TagText, ThreeDots } from '../../../../components';
import { Highlight, TrackedState, useReader } from '../../../../package/epub-reader';
import { deleteHighlightedText } from '../../../../store';
import { Theme, useTheme } from '../../../../styles';
import { ICON_SIZE } from '../../../../utils';

import { EmptyTab } from './EmptyTab';
import { formatTimestamp } from './utils';

type HighlightedTextsProps = {
  trackedState: TrackedState | null;
  bookId: string;
};

export const HighlightedTexts = ({ trackedState, bookId }: HighlightedTextsProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);
  const navigation = useNavigation();
  const { removeHighlight, goToLocation } = useReader();
  const [allHighlights, setAllHighlights] = useState(trackedState?.highlights || []);
  const [activeHighlightId, setActiveHighlightId] = useState<number | null>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });

  const handleThreeDotPress = (event: NativeSyntheticEvent<NativeTouchEvent>, highlight: Highlight) => {
    const { pageY } = event.nativeEvent;
    const top = pageY + 10;
    const right = 16;
    setMenuPosition({ top, right });
    setActiveHighlightId(activeHighlightId === highlight.id ? null : highlight.id);
  };

  const handleDeleteHighlight = (highlight: Highlight) => {
    setActiveHighlightId(null);
    setAllHighlights((highlights) => highlights.filter((item) => item.id !== highlight.id));
    deleteHighlightedText(bookId, highlight.id);
    removeHighlight(highlight);
  };

  if (allHighlights.length === 0) {
    return (
      <EmptyTab
        label="No Highlights"
        desc="No highlights found. Save important passages to revisit your favourite moments!"
      />
    );
  }

  return (
    <ScrollView style={styles.wrapper}>
      {allHighlights.map((highlight, index) => {
        const isActive = activeHighlightId === highlight.id;
        return (
          <PressableItem
            key={index}
            style={[styles.frame, index !== allHighlights.length - 1 && styles.underline]}
            onPress={() => {
              goToLocation(highlight.cfiRange);
              navigation.goBack();
            }}
          >
            <View style={styles.textContainer}>
              <BodyText
                bold
                style={[styles.highlightText, { backgroundColor: highlight.colour }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {highlight.text}
              </BodyText>
              <TagText style={styles.date}>{formatTimestamp(highlight.createdAt)}</TagText>
            </View>
            <View style={utils.align_self_end}>
              <ThreeDots vertical onPress={(event) => handleThreeDotPress(event, highlight)} />
              <Modal visible={isActive} transparent animationType="fade">
                <TouchableWithoutFeedback onPress={() => setActiveHighlightId(null)}>
                  <View style={utils.flex}>
                    <View style={[styles.modalContent, { top: menuPosition.top, right: menuPosition.right }]}>
                      <PressableItem onPress={() => handleDeleteHighlight(highlight)} style={styles.deleteButton}>
                        <MaterialIcons name="delete-outline" size={ICON_SIZE} color={theme.colors.primary} />
                        <BodyText>Delete Highlight</BodyText>
                      </PressableItem>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
            </View>
          </PressableItem>
        );
      })}
    </ScrollView>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor: theme.colors.background
    },
    frame: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 13,
      marginVertical: 4
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center',
      marginRight: 24,
      paddingRight: 16
    },
    modalContent: {
      position: 'absolute',
      backgroundColor: theme.colors.cardBackground
    },
    deleteButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 10
    },
    highlightText: {
      padding: 2,
      flexShrink: 1
    },
    underline: {
      borderBottomColor: theme.colors.inactiveButtonColor,
      borderBottomWidth: 1
    },
    date: {
      color: theme.colors.secondaryText,
      marginTop: 4
    }
  });
