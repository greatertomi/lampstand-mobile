import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '../../styles';
import { ICON_SIZE, logger } from '../../utils';
import { Dialog } from '../Dialog';
import { PreferenceList } from '../List';
import { BodyText, BodyTextSmall } from '../Typography';

import { BookCover } from './BookCover';
import { DeleteBookModal } from './DeleteBookModal';

import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

interface BookOptionsProps {
  title?: string;
  bookCover: string | null;
  author?: string;
  filePath: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

type BookOptionsState = {
  title: string;
  icon: React.JSX.Element;
  variant?: 'primary' | 'secondary';
  onPress?: () => void;
};

export const BookOptionsModal = ({ isOpen, setIsOpen, bookCover, title, author, filePath }: BookOptionsProps) => {
  const { theme } = useTheme();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const utils = theme.utilities;

  const shareBook = async () => {
    try {
      if (!filePath) return;
      const fileInfo = await FileSystem.getInfoAsync(filePath);
      if (fileInfo.exists) {
        await Sharing.shareAsync(filePath);
      }
    } catch (error) {
      logger.error('Error sharing book:', error);
    }
  };

  const bookOptions: BookOptionsState[] = [
    {
      title: 'Share',
      icon: <AntDesign name="sharealt" size={ICON_SIZE} color={theme.colors.text} />,
      onPress: shareBook
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
    <Dialog modalHeight="50%" isOverlay isVisible={isOpen} onClose={() => setIsOpen(!isOpen)}>
      <>
        <View>
          <View style={styles.bookCover}>
            <BookCover cover={bookCover} />
          </View>
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
      </>
      {isDeleteModal && (
        <DeleteBookModal
          title={title}
          author={author}
          onClose={() => setIsDeleteModal(!isDeleteModal)}
          closeBookOption={() => setIsOpen(!isOpen)}
        />
      )}
    </Dialog>
  );
};

const styles = StyleSheet.create({
  bookCover: {
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
