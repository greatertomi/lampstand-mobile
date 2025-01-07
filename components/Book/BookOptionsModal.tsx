import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, View } from 'react-native';

import { Theme, useTheme } from '../../styles';
import { ICON_SIZE } from '../../utils';
import { PreferenceList } from '../List';
import { BodyText, BodyTextSmall } from '../Typography';

import { DeleteBookModal } from './DeleteBookModal';
import { EmptyBookCover } from './EmptyBookCover';

interface BookOptionsProps {
  title?: string;
  bookCover: string | null;
  author?: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

type BookOptionsState = {
  title: string;
  icon: React.JSX.Element;
  variant?: 'primary' | 'secondary';
  onPress?: () => void;
};

export const BookOptionsModal = ({ isOpen, setIsOpen, bookCover, title, author }: BookOptionsProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const utils = theme.utilities;

  const bookOptions: BookOptionsState[] = [
    {
      title: 'Share',
      icon: <AntDesign name="sharealt" size={ICON_SIZE} color={theme.colors.text} />
    },
    {
      title: 'Mark complete',
      icon: <Ionicons name="checkmark-circle-outline" size={ICON_SIZE} color={theme.colors.text} />
    },
    {
      title: 'Remove from Library',
      variant: 'primary',
      icon: <MaterialCommunityIcons name="delete-outline" size={ICON_SIZE} color={theme.colors.primary} />,
      onPress: () => setIsDeleteModal(!isDeleteModal)
    }
  ];

  return (
    <Modal animationType="slide" transparent visible={isOpen}>
      <Pressable style={styles.overlay} onPress={() => setIsOpen(!isOpen)} />
      <View style={styles.modalContent}>
        <Pressable onPress={() => setIsOpen(!isOpen)}>
          <View style={styles.line} />
        </Pressable>
        <View>
          {bookCover ? (
            <Image source={{ uri: bookCover }} style={styles.image} />
          ) : (
            <View style={styles.image}>
              <EmptyBookCover />
            </View>
          )}
          <BodyText numberOfLines={1} ellipsizeMode="tail" bold style={[utils.text_center, utils.mt_2]}>
            {title}
          </BodyText>
          <BodyTextSmall style={[utils.text_center, styles.author]} variant="secondary">
            by {author}
          </BodyTextSmall>
        </View>
        <View>
          {bookOptions.map((bookOption, index) => (
            <PreferenceList
              key={index}
              hasLeftIcon
              leftIcon={bookOption.icon}
              title={bookOption.title}
              isPressable
              variant={bookOption.variant}
              hasUnderline={index !== bookOptions.length - 1}
              onPress={bookOption.onPress}
            />
          ))}
        </View>
      </View>
      {isDeleteModal && (
        <DeleteBookModal
          title={title}
          author={author}
          onClose={() => setIsDeleteModal(!isDeleteModal)}
          closeBookOption={() => setIsOpen(!isOpen)}
        />
      )}
    </Modal>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: theme.colors.overlayBackground
    },
    modalContent: {
      height: '52%',
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
      width: 80,
      height: 5,
      marginTop: 15,
      alignSelf: 'center',
      borderRadius: 10,
      backgroundColor: theme.colors.secondaryText
    },
    image: {
      width: 115,
      height: 160,
      resizeMode: 'stretch',
      borderRadius: 5,
      alignSelf: 'center'
    },
    author: {
      marginTop: 3
    }
  });
