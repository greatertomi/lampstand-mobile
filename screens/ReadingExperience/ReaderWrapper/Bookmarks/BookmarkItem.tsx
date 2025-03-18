import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Modal, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';

import { BodyText, BodyTextSmall, PressableItem, ThreeDots } from '../../../../components';
import { Location, useReader } from '../../../../package/epub-reader';
import { Theme, useTheme } from '../../../../styles';
import { ICON_SIZE } from '../../../../utils';

interface BookmarkItemProps {
  label: string;
  createdAt: string;
  location: Location;
  onDeleteBookmark: () => void;
  isActive: boolean;
  setActiveBookmarkId: (id: string | null) => void;
  bookmarkId: string;
}

export const BookmarkItem = ({
  location,
  onDeleteBookmark,
  label,
  createdAt,
  isActive,
  setActiveBookmarkId,
  bookmarkId
}: BookmarkItemProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);
  const { goToLocation } = useReader();
  const navigation = useNavigation();
  const [modalPosition, setModalPosition] = useState({ top: 0, right: 0 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleThreeDotsPress = (event: { nativeEvent: { pageY: any } }) => {
    const { pageY } = event.nativeEvent;
    const top = pageY + 10;
    const right = 16;
    setModalPosition({ top, right });
    setActiveBookmarkId(isActive ? null : bookmarkId);
  };

  return (
    <View style={styles.sort}>
      <PressableItem
        style={styles.row}
        onPress={() => {
          goToLocation(location?.start?.cfi);
          navigation.goBack();
        }}
      >
        <View>
          <BodyText style={styles.bookmark} ellipsizeMode="tail" numberOfLines={1}>
            {label}
          </BodyText>
          <BodyTextSmall variant="secondary">{createdAt}</BodyTextSmall>
        </View>
      </PressableItem>
      <View>
        <ThreeDots vertical onPress={handleThreeDotsPress} />
        <Modal visible={isActive} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={() => setActiveBookmarkId(null)}>
            <View style={utils.flex}>
              <View style={[styles.modalContent, { top: modalPosition.top, right: modalPosition.right }]}>
                <PressableItem onPress={onDeleteBookmark} style={styles.deleteButton}>
                  <MaterialCommunityIcons name="delete-outline" size={ICON_SIZE} color={theme.colors.primary} />
                  <BodyText>Delete Bookmark</BodyText>
                </PressableItem>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    sort: {
      borderBottomColor: theme.colors.secondaryText,
      borderBottomWidth: 0.2,
      paddingVertical: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 16,
      alignItems: 'center'
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    bookmark: {
      marginBottom: 5
    },
    modalContent: {
      position: 'absolute',
      backgroundColor: theme.colors.white,
      borderRadius: 10,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.15
    },
    deleteButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 10
    }
  });
